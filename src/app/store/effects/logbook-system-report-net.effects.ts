import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction } from '../actions/index';
import { tap, switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class LogbookSystemReportNetEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getSystemReportNet$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.GET_SYSTEM_REPORT_NET_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetSystemReportNetAction) =>
                    this.logbookService.getSystemReportNet(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetSystemReportNetSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetSystemReportNetErrorAction(error)])
                    )
                )
                );
                @Effect()
                getSystemReportNetSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.GET_SYSTEM_REPORT_NET_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getSystemReportNetError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.GET_SYSTEM_REPORT_NET_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSystemReportNet$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.ADD_SYSTEM_REPORT_NET_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddSystemReportNetAction) =>
                    this.logbookService.addSystemReportNet(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddSystemReportNetSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddSystemReportNetErrorAction(error)])
                    )
                )
                );
                @Effect()
                addSystemReportNetSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.ADD_SYSTEM_REPORT_NET_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add SystemReportNet',
                             detail: 'System Report Net has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSystemReportNetError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.ADD_SYSTEM_REPORT_NET_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add SystemReportNet',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSystemReportNet$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateSystemReportNetAction) =>
                    this.logbookService.updateSystemReportNet(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateSystemReportNetSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateSystemReportNetErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateSystemReportNetSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update SystemReportNet',
                             detail: 'System Report Net has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSystemReportNetError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update SystemReportNet',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
