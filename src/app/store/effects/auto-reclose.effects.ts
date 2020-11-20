import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { AutoRecloseService } from 'src/app/shared/services/auto-reclose.service';

@Injectable()
export class AutoRecloseEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private autoRecloseService: AutoRecloseService,
                private messageService: MessageService) {}

    @Effect()
    addAutoRecloseEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.ADD_AUTO_RECLOSE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddAutoRecloseAction) =>
            this.autoRecloseService.addAutoRecloseData(action.payload)
            .pipe(
                map(result => {
                    this.store.dispatch(new DataUpdateSignalREventAction({
                        logbookId : action.payload[0].LogbookId,
                        updatedItem: 'AutoReclose',
                        updatedSubItem: action.payload[0].Type,
                        isDashboardUpdated: false
                    }));
                    return new RootActions.AddAutoRecloseSuccessAction(result);
                }),
                catchError(error => [new RootActions.AddAutoRecloseErrorAction(error)])
            )
        )
    );

    @Effect()
    addAutoRecloseSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.ADD_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Auto Reclose Items',
                 detail: 'Auto Reclose items created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addAutoRecloseError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.ADD_AUTO_RECLOSE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Auto Reclose Items',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateAutoRecloseEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.UPDATE_AUTO_RECLOSE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateAutoRecloseAction) =>
            this.autoRecloseService.updateAutoRecloseData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        this.store.dispatch(new GetPendingCodesAction());
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'AutoReclose',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.UpdateDashboardAutoRecloseSuccessAction({
                            updatedData: result,
                            previousData: action.payload
                        });
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.UpdateHistoryAutoRecloseSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'AutoReclose',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.UpdateLogbookAutoRecloseSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.UpdateAutoRecloseErrorAction(error)])
            )
        )
    );

    @Effect()
    updateAutoRecloseSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.UPDATE_LOGBOOK_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Auto Reclose',
                 detail: 'Auto Reclose updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDashboardAutoRecloseSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.UPDATE_DASHBOARD_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Auto Reclose',
                 detail: 'AutoReclose updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateHistoryAutoRecloseSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.UPDATE_HISTORY_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Auto Reclose',
                 detail: 'AutoReclose updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatedAutoRecloseError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.UPDATE_AUTO_RECLOSE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Auto Reclose',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteAutoRecloseEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteAutoRecloseAction) =>
            this.autoRecloseService.deleteAutoRecloseData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsHistoryUpdate) {
                        return new RootActions.DeleteHistoryAutoRecloseSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'AutoReclose',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.DeleteAutoRecloseSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.DeleteAutoRecloseErrorAction(error)])
            )
        )
    );

    @Effect()
    deleteAutoRecloseSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Auto Reclose',
                 detail: 'Auto Reclose items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteHistoryAutoRecloseSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.DELETE_HISTOEY_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Auto Reclose',
                 detail: 'Auto Reclose items deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteAutoRecloseError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Delete Auto Reclose',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookAutoReclose$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_AUTORECLOSE_TRY),
        mergeMap((action: RootActions.GetLogbookAutoRecloseAction) =>
            this.autoRecloseService.getLogbookData(action.payload.logbookId, action.payload.type)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookAutoRecloseSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookAutoRecloseErrorAction(error)])
                )
        )
    );
}
