import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { AntiTheftService } from 'src/app/shared/services/antitheft.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap } from 'rxjs/internal/operators/tap';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction } from '../actions/index';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class AntiTheftEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private antiTheftService: AntiTheftService,
                private messageService: MessageService) {}

    @Effect()
    addAntiTheftEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.ADD_ANTITHEFT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddAntiTheftAction) =>
            this.antiTheftService.addAntiTheftData(action.payload)
            .pipe(
                map(result => {
                    this.store.dispatch(new DataUpdateSignalREventAction({
                        logbookId : action.payload[0].LogbookId,
                        updatedItem: 'AntiTheft',
                        updatedSubItem: action.payload[0].Type,
                        isDashboardUpdated: false
                    }));
                    return new RootActions.AddAntiTheftSuccessAction(result);
                }),
                catchError(error => [new RootActions.AddAntiTheftErrorAction(error)])
            )
        )
    );

    @Effect()
    addAntiTheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.ADD_ANTITHEFT_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Anti Theft Items',
                 detail: 'Anti Theft items created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addAntiTheftError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.ADD_ANTITHEFT_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Anti Theft Items',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateAntiTheftEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.UPDATE_ANTITHEFT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateAntiTheftAction) =>
            this.antiTheftService.updateAntiTheftData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        this.store.dispatch(new GetPendingCodesAction());
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'AntiTheft',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: true
                        }));
                        return new RootActions.UpdateDashboardAntiTheftSuccessAction({
                            updatedData: result,
                            previousData: action.payload
                        });
                    } else if (action.payload.IsHistoryUpdate) {
                        return new RootActions.UpdateHistoryAntiTheftSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'AntiTheft',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.UpdateLogbookAntiTheftSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.UpdateAntiTheftErrorAction(error)])
            )
        )
    );

    @Effect()
    updateAntiTheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.UPDATE_LOGBOOK_ANTITHEFT_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Anti Theft',
                 detail: 'Anti Theft updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDashboardAntiTheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.UPDATE_DASHBOARD_ANTITHEFT_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Anti Theft',
                 detail: 'Anti Theft updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateHistpryAntiTheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.UPDATE_HISTORY_ANTITHEFT_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Anti Theft',
                 detail: 'Anti Theft updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatedAntiTheftError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.UPDATE_ANTITHEFT_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Anti Theft',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteAntiTheftEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.DELETE_ANTITHEFT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteAntiTheftAction) =>
            this.antiTheftService.deleteAntiTheftData(action.payload)
            .pipe(
                map(result => {
                    if (action.payload.IsHistoryUpdate) {
                        return new RootActions.DeleteHistoryAntiTheftSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.LogbookId,
                            updatedItem: 'AntiTheft',
                            updatedSubItem: action.payload.Type,
                            isDashboardUpdated: false
                        }));
                        return new RootActions.DeleteAntiTheftSuccessAction(result);
                    }
                }),
                catchError(error => [new RootActions.DeleteAntiTheftErrorAction(error)])
            )
        )
    );

    @Effect()
    deleteAntiTheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.DELETE_ANTITHEFT_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Anti Theft',
                 detail: 'Anti Theft item deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteHistoryAntiTheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.DELETE_HISTORY_ANTITHEFT_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Anti Theft',
                 detail: 'Anti Theft item deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteAntiTheftError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.AntiTheftActions.DELETE_ANTITHEFT_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Delete Anti Theft',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookAntTheft$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_ANTITHEFT_TRY),
        mergeMap((action: RootActions.GetLogbookAntiTheftAction) =>
            this.antiTheftService.getLogbookData(action.payload.logbookId, action.payload.type)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookAntiTheftSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookAntiTheftErrorAction(error)])
                )
        )
    );
}
