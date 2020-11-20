import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { OutageService } from 'src/app/shared/services/outage.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class OutageEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private outageService: OutageService,
                private messageService: MessageService) {}

    @Effect()
    addOutageEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.ADD_OUTAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddOutageAction) =>
            this.outageService.addOutageData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload[0].Type === 10 || action.payload[0].Type === 12) {
                        this.store.dispatch(new RootActions.GetFscTcscAction(
                            {
                                logbookId: action.payload[0].LogbookId,
                                IsDashboardUpdate: false
                            }));
                    }
                    if (action.payload[0].Type === 11) {
                        this.store.dispatch(new RootActions.GetStatcomAction(
                            {
                                logbookId: action.payload[0].LogbookId,
                                IsDashboardUpdate: false
                            }));
                    }
                    this.store.dispatch(new DataUpdateSignalREventAction({
                        logbookId : action.payload[0].LogbookId,
                        updatedItem: 'Outage',
                        updatedSubItem: action.payload[0].Type,
                        isDashboardUpdated: false
                    }));
                    return new RootActions.AddOutageSuccessAction(result);
                }),
                catchError(error => [new RootActions.AddOutageErrorAction(error)])
            )
        )
    );

    @Effect()
    addOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.ADD_OUTAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Outage Items',
                 detail: 'Outage items created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addOutageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.ADD_OUTAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Outage Items',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateOutageEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.UPDATE_OUTAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateOutageAction) =>
            this.outageService.updateOutageData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        this.store.dispatch(new GetPendingCodesAction());
                        if (action.payload.Type === 10 || action.payload.Type === 12) {
                            this.store.dispatch(new RootActions.GetFscTcscAction(
                                {
                                    logbookId: '',
                                    IsDashboardUpdate: true
                                }));
                        }
                        if (action.payload.Type === 11) {
                            this.store.dispatch(new RootActions.GetStatcomAction(
                                {
                                    logbookId: '',
                                    IsDashboardUpdate: true
                                }));
                        }
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Outage',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.UpdateDashboardOutageSuccessAction({
                            updatedData: result,
                            previousData: action.payload
                        });
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.UpdateHistoryOutageSuccessAction(result);
                    } else {
                        if (action.payload.Type === 10 || action.payload.Type === 12) {
                            this.store.dispatch(new RootActions.GetFscTcscAction(
                                {
                                    logbookId: action.payload.LogbookId,
                                    IsDashboardUpdate: false
                                }));
                        }
                        if (action.payload.Type === 11) {
                            this.store.dispatch(new RootActions.GetStatcomAction(
                                {
                                    logbookId: action.payload.LogbookId,
                                    IsDashboardUpdate: false
                                }));
                        }
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Outage',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.UpdateLogbookOutageSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.UpdateOutageErrorAction(error)])
            )
        )
    );

    @Effect()
    updateOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.UPDATE_LOGBOOK_OUTAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Outage',
                 detail: 'Outage updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDashboardOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.UPDATE_DASHBOARD_OUTAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Outage',
                 detail: 'Outage updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateHistoryOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.UPDATE_HISTORY_OUTAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Outage',
                 detail: 'Outage updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatedOutageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.UPDATE_OUTAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Outage',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteOutageEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.DELETE_OUTAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteOutageAction) =>
            this.outageService.deleteOutageData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsHistoryUpdate) {
                        return new RootActions.DeleteHistoryOutageSuccessAction(result);
                    } else {
                        if (action.payload.Type === 10 || action.payload.Type === 12) {
                            this.store.dispatch(new RootActions.GetFscTcscAction(
                                {
                                    logbookId: action.payload.LogbookId,
                                    IsDashboardUpdate: false
                                }));
                        }
                        if (action.payload.Type === 11) {
                            this.store.dispatch(new RootActions.GetStatcomAction(
                                {
                                    logbookId: action.payload.LogbookId,
                                    IsDashboardUpdate: false
                                }));
                        }
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Outage',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.DeleteOutageSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.DeleteOutageErrorAction(error)])
            )
        )
    );

    @Effect()
    deleteOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.DELETE_OUTAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Outage',
                 detail: 'Outage items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteHistoryOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.DELETE_HISTORY_OUTAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Outage',
                 detail: 'Outage items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteOutageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.OutageActions.DELETE_OUTAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Delete Outage',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookOutage$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_OUTAGE_TRY),
        mergeMap((action: RootActions.GetLogbookOutageAction) =>
            this.outageService.getLogbookData(action.payload.logbookId, action.payload.type)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookOutageSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookOutageErrorAction(error)])
                )
        )
    );
}
