import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ShutdownService } from 'src/app/shared/services/shutdown.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction, GetDashboardShutdownAction, GetLogbookShutdownAction } from '../actions/index';

@Injectable()
export class ShutdownEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private shutdownService: ShutdownService,
                private messageService: MessageService) {}

    @Effect()
    updateShutdownEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.UPDATE_APPROVED_SHUTDOWN_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateApprovedShutdownAction) =>
            this.shutdownService.updateShutdownData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        this.store.dispatch(new GetPendingCodesAction());
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Shutdown',
                            updatedSubItem: 0,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.UpdateDashboardApprovedShutdownSuccessAction({
                            updatedData: result,
                            previousData: action.payload
                        });
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.UpdateHistoryApprovedShutdownSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Shutdown',
                            updatedSubItem: 0,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.UpdateLogbookApprovedShutdownSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.UpdateApprovedShutdownErrorAction(error)])
            )
        )
    );

    @Effect()
    updateShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.UPDATE_LOGBOOK_APPROVED_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Shutdown',
                 detail: 'Shutdown updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDashboardShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.UPDATE_DASHBOARD_APPROVED_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Shutdown',
                 detail: 'Shutdown updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateHistoryShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.UPDATE_HISTORY_APPROVED_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Shutdown',
                 detail: 'Shutdown updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatedShutdownError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.UPDATE_APPROVED_SHUTDOWN_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Shutdown',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deferShutdownEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DEFER_SHUTDOWN_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeferShutdownAction) =>
            this.shutdownService.deferShutdown(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Shutdown',
                            updatedSubItem: 0,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.DeferDashboardShutdownSuccessAction();
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.DeferHistoryShutdownSuccessAction();
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'Shutdown',
                            updatedSubItem: 0,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.DeferLogbookShutdownSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.DeferShutdownErrorAction(error)])
            )
        )
    );

    @Effect()
    deferLogbookShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DEFER_LOGBBOK_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Defer Shutdown',
                 detail: 'Shutdown deferred successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deferDashboardShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DEFER_DASHBOARD_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Defer Shutdown',
                 detail: 'Shutdown deferred successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deferHistoryShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DEFER_HISTORY_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Defer Shutdown',
                 detail: 'Shutdown deferred successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deferShutdownError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DEFER_SHUTDOWN_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Defer Shutdown',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    refrreshShutdownEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.REFRESH_SHUTDOWN_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.RefreshShutdownAction) =>
            this.shutdownService.refreshShutdownData(action.payload.logbookId, action.payload.isIntervalCall)
            .pipe(
                map(result => {
                    if (!action.payload.isDashBoardCall) {
                        return new RootActions.RefreshShutdownSuccessAction();
                    } else {
                        return new RootActions.GetDashboardShutdownAction();
                    }
                }),
                catchError(error => [new RootActions.RefreshShutdownErrorAction(error)])
            )
        )
    );

    @Effect()
    refreshShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.REFRESH_SHUTDOWN_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Refresh Shutdown',
                 detail: 'Shutdown refreshed successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    refreshShutdownError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.REFRESH_SHUTDOWN_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Refresh Shutdown',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    downloadShutdownEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DOWNLOAD_SHUTDOWN_APPROVAL_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DownloadApprovalAction) =>
            this.shutdownService.getShutdownApprovalPDF(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.DownloadApprovalSuccessAction();
                }),
                catchError(error => [new RootActions.DownloadApprovalErrorAction(error)])
            )
        )
    );

    @Effect()
    downloadShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DOWNLOAD_SHUTDOWN_APPROVAL_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    donloadShutdownError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShutdownRequestActions.DOWNLOAD_SHUTDOWN_APPROVAL_ERROR),
        switchMap((error: any) => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookShutdown$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_SHUTDOWN_TRY),
        mergeMap((action: RootActions.GetLogbookShutdownAction) =>
            this.shutdownService.getLogbookData(action.payload.logbookId, action.payload.type)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookShutdownSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookShutdownErrorAction(error)])
                )
        )
    );
}
