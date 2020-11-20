import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { FirstTimeChargeDataService } from 'src/app/shared/services/first-time-charge-data.service';

@Injectable()
export class FirstTimeChargeEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private firstTimeChargeService: FirstTimeChargeDataService,
                private messageService: MessageService) {}

    @Effect()
    addFirstTimeChargeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddFirstTimeChargeAction) =>
            this.firstTimeChargeService.addFirstTimeChargeData(action.payload)
            .pipe(
                map(result => {
                    this.store.dispatch(new DataUpdateSignalREventAction({
                        logbookId : action.payload[0].LogbookId,
                        updatedItem: 'FirstTimeCharge',
                        // updatedSubItem: action.payload[0].Type,
                        updatedSubItem: 0,
                        isDashboardUpdated: false
                    }));
                    return new RootActions.AddFirstTimeChargeSuccessAction(result);
                }),
                catchError(error => [new RootActions.AddFirstTimeChargeErrorAction(error)])
            )
        )
    );

    @Effect()
    addFirstTimeChargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add First Time Charge Items',
                 detail: 'First Time Charge items created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addFirstTimeChargeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add First Time Charge Items',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateFirstTimeChargeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.UPDATE_FIRST_TIME_CHARGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateFirstTimeChargeAction) =>
            this.firstTimeChargeService.updateFirstTimeChargeData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        this.store.dispatch(new GetPendingCodesAction());
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'FirstTimeCharge',
                            // updatedSubItem: action.payload.Type,
                            updatedSubItem: 0,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.UpdateDashboardFirstTimeChargeSuccessAction({
                            updatedData: result,
                            previousData: action.payload
                        });
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.UpdateHistoryFirstTimeChargeSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'FirstTimeCharge',
                            // updatedSubItem: action.payload.Type,
                            updatedSubItem: 0,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.UpdateLogbookFirstTimeChargeSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.UpdateFirstTimeChargeErrorAction(error)])
            )
        )
    );

    @Effect()
    updateFirstTimeChargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.UPDATE_LOGBOOK_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update First Time Charge',
                 detail: 'First Time Charge updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDashboardFirstTimeChargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.UPDATE_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update First Time Charge',
                 detail: 'FirstTimeCharge updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateHistoryFirstTimeChargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.UPDATE_HISTORY_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update First Time Charge',
                 detail: 'FirstTimeCharge updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatedFirstTimeChargeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.UPDATE_FIRST_TIME_CHARGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update First Time Charge',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteFirstTimeChargeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteFirstTimeChargeAction) =>
            this.firstTimeChargeService.deleteFirstTimeChargeData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsHistoryUpdate) {
                        return new RootActions.DeleteHistoryFirstTimeChargeSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'FirstTimeCharge',
                            // updatedSubItem: action.payload.Type,
                            updatedSubItem: 0,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.DeleteFirstTimeChargeSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.DeleteFirstTimeChargeErrorAction(error)])
            )
        )
    );

    @Effect()
    deleteFirstTimeChargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete First Time Charge',
                 detail: 'First Time Charge items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteHistoryFirstTimeChargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.DELETE_HISTOEY_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete First Time Charge',
                 detail: 'First Time Charge items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteFirstTimeChargeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Delete First Time Charge',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookFirstTimeCharge$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_TRY),
        mergeMap((action: RootActions.GetLogbookFirstTimeChargeAction) =>
            this.firstTimeChargeService.getLogbookData(action.payload.logbookId, action.payload.type)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookFirstTimeChargeSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookFirstTimeChargeErrorAction(error)])
                )
        )
    );
}
