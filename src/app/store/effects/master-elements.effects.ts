import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import * as RootActions from '../actions/index';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';

@Injectable()
export class MasterElementsEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private masterDataService: MasterDataService,
                private logbookService: LogbookService) {}

    @Effect()
    getMasterElements: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_MASTER_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetMasterElementsAction) =>
            this.masterDataService.getMasterElementsData()
            .pipe(
                map(result => {
                    return new RootActions.GetMasterElementsSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetMasterElementsErrorAction(error)])
            )
        )
    );

    @Effect()
    getMasterElementSuccess: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_MASTER_ELEMENTS_SUCCESS),
        mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getMasterElementError: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_MASTER_ELEMENTS_ERROR),
        mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getCommonMasterDataAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_COMMON_MASTER_DATA_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetCommonMasterDataAction) =>
            this.masterDataService.getCommonMasterData()
            .pipe(
                map(result => {
                    return new RootActions.GetCommonMasterDataSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetCommonMasterDataErrorAction(error)])
            )
        )
    );

    @Effect()
    getCommonMasterDataSuccess: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_COMMON_MASTER_DATA_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getCommonMasterDataError: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_COMMON_MASTER_DATA_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getOutageSelectOptionsAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_REASON_REMARKS_OPTIONS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetReasonRemarksOptionsAction) =>
            this.masterDataService.getSelectOptions()
            .pipe(
                map(result => {
                    return new RootActions.GetReasonRemarksOptionsSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetReasonRemarksOptionsErrorAction(error)])
            )
        )
    );

    @Effect()
    getOutageSelectOptionsSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.MasterElementsActions.GET_REASON_REMARKS_OPTIONS_SUCCESS,
             RootActions.MasterElementsActions.GET_REASON_REMARKS_OPTIONS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getStateWiseDeviationAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SCADADataActions.GET_STATE_WISE_DEVIATION_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetStateWiseDeviationAction) =>
            this.logbookService.getStateWiseDeviation(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetStateWiseDeviationSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetStateWiseDeviationErrorAction(error)])
            )
        )
    );

    @Effect()
    getStateWiseDeviationSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SCADADataActions.GET_STATE_WISE_DEVIATION_SUCCESS,
             RootActions.SCADADataActions.GET_STATE_WISE_DEVIATION_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );
}
