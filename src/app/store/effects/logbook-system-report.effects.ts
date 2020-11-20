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
export class LogbookSystemReportEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getSystemReport$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.GET_SYSTEM_REPORT_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetSystemReportAction) =>
                    this.logbookService.getSystemReport(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetSystemReportSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetSystemReportErrorAction(error)])
                    )
                )
                );
                @Effect()
                getSystemReportSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.GET_SYSTEM_REPORT_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getSystemReportError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.GET_SYSTEM_REPORT_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSystemReport$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.ADD_SYSTEM_REPORT_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddSystemReportAction) =>
                    this.logbookService.addSystemReport(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddSystemReportSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddSystemReportErrorAction(error)])
                    )
                )
                );
                @Effect()
                addSystemReportSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.ADD_SYSTEM_REPORT_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add SystemReport',
                             detail: 'System Report has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSystemReportError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.ADD_SYSTEM_REPORT_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add SystemReport',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSystemReport$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.UPDATE_SYSTEM_REPORT_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateSystemReportAction) =>
                    this.logbookService.updateSystemReport(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateSystemReportSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateSystemReportErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateSystemReportSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.UPDATE_SYSTEM_REPORT_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update SystemReport',
                             detail: 'System Report has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSystemReportError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SystemReportActions.UPDATE_SYSTEM_REPORT_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update SystemReport',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
