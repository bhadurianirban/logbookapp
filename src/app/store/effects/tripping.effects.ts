import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { TrippingService } from 'src/app/shared/services/tripping.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TrippingEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private trippingService: TrippingService,
                private messageService: MessageService) {}

    @Effect()
    addTrippingEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.ADD_TRIPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddTrippingAction) =>
            this.trippingService.addTripping(action.payload)
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
                        updatedItem: 'Tripping',
                        updatedSubItem:  action.payload[0].Type,
                        isDashboardUpdated: false
                    }));
                    return new RootActions.AddTrippingSuccessAction(result);
                }),
                catchError(error => [new RootActions.AddTrippingErrorAction(error)])
            )
        )
    );

    @Effect()
    addTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.ADD_TRIPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Tripping Item(s)',
                 detail: 'Tripping item(s) added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addTrippingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.ADD_TRIPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Tripping Item(s)',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateTrippingEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.UPDATE_TRIPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateTrippingAction) =>
            this.trippingService.updateTripping(action.payload)
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
                            updatedItem: 'Tripping',
                            updatedSubItem:  action.payload.Type,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.UpdateDashboardTrippingSuccessAction(
                            {
                                updatedData: result,
                                previousData: action.payload
                            });
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.UpdateHistoryTrippingSuccessAction(result);
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
                            updatedItem: 'Tripping',
                            updatedSubItem:  action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.UpdateLogbookTrippingSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.UpdateTrippingErrorAction(error)])
            )
        )
    );

    @Effect()
    updateTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.UPDATE_LOGBOOK_TRIPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Tripping',
                 detail: 'Tripping updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateTrippingDashboardSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.UPDATE_DASHBOARD_TRIPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Tripping',
                 detail: 'Tripping updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateHistoryTrippingDashboardSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.UPDATE_HISTORY_TRIPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Tripping',
                 detail: 'Tripping updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatedTrippingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.UPDATE_TRIPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Tripping',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteTrippingEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.DELETE_TRIPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteTrippingAction) =>
            this.trippingService.deleteTripping(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsHistoryUpdate) {
                        return new RootActions.DeleteHistoryTrippingSuccessAction(result);
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
                            updatedItem: 'Tripping',
                            updatedSubItem:  action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.DeleteTrippingSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.DeleteTrippingErrorAction(error)])
            )
        )
    );

    @Effect()
    deleteTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.DELETE_TRIPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Tripping',
                 detail: 'Tripping items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteHistoryTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.DELETE_HISTORY_TRIPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Tripping',
                 detail: 'Tripping items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteTrippingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingActions.DELETE_TRIPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Delete Tripping',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookTripping$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_TRIPPING_TRY),
        mergeMap((action: RootActions.GetLogbookTrippingAction) =>
            this.trippingService.getLogbookData(action.payload.logbookId, action.payload.type)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookTrippingSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookTrippingErrorAction(error)])
                )
        )
    );
}
