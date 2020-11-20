import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { FirstTimeChargeLineValuesService } from 'src/app/master-data/services/first-time-charge-line-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class FirstTimeChargeLineEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private lineService: FirstTimeChargeLineValuesService,
                private messageService: MessageService) {}

    @Effect()
    getFirstTimeChargeLineValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.GET_LINE_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetLineValuesAction) =>
            this.lineService.getAllFirstTimeChargeLineData()
                .pipe(
                    map(result => {
                        return new RootActions.GetLineValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLineValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getFirstTimeChargeLineSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.GET_LINE_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Line Values',
                     detail: 'Line values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getFirstTimeChargeLineError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.GET_LINE_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Line Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addFirstTimeChargeLineValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.ADD_LINE_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddLineValueAction) =>
        this.lineService.addUpdateFirstTimeChargeLineData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddLineValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddLineValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addFirstTimeChargeLineValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.ADD_LINE_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Line',
                 detail: 'Line Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addFirstTimeChargeLineValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.ADD_LINE_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Line',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateFirstTimeChargeLineValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateLineValueAction) =>
        this.lineService.addUpdateFirstTimeChargeLineData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateLineValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateLineValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateFirstTimeChargeLineValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Line',
                 detail: 'Line Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateFirstTimeChargeLineValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Line',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
