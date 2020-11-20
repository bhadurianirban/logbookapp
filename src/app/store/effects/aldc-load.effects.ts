import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { AldcLoadService } from 'src/app/aldc-load/aldc-load.service';
import { Observable } from 'rxjs/internal/Observable';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class ALDCLoadEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private loadService: AldcLoadService) {}

    @Effect()
    updateALDCLoadAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.UPDATE_ALDC_LOAD_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateALDCLoadAction) =>
            this.loadService.UpdateLoads(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.UpdateALDCLoadSuccessAction(result);
                }),
                catchError(error => [new RootActions.UpdateALDCLoadErrorAction(error)])
            )
        )
    );

    @Effect()
    updateALDCLoadSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.UPDATE_ALDC_LOAD_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateALDCLoadError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.UPDATE_ALDC_LOAD_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getALDCLoadAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_LOAD_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetALDCLoadAction) =>
            this.loadService.getLoads(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetALDCLoadSuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetALDCLoadErrorAction(error)])
            )
        )
    );

    @Effect()
    getALDCLoadSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_LOAD_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getALDCLoadError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_LOAD_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getALDCGridAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_GRID_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetALDCGridAction) =>
            this.loadService.getGrids(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetALDCGridSuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetALDCGridErrorAction(error)])
            )
        )
    );

    @Effect()
    getALDCGriduccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_GRID_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getALDCGridError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_GRID_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getALDCRestGridAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetALDCGridRestrictionsAction) =>
            this.loadService.getGridsWithRestriction(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetALDCGridRestrictionsuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetALDCGridRestrictionsErrorAction(error)])
            )
        )
    );

    @Effect()
    getALDCRestGriduccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getALDCRestGridError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );
}
