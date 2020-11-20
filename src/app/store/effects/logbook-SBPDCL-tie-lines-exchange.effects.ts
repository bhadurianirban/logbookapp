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
export class LogbookSBPDCLTieLinesExchangeEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                addSBPDCLTieLinesExchange$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddSBPDCLTieLinesExchangeAction) =>
                    this.logbookService.addSBPDCLTieLinesExchange(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddSBPDCLTieLinesExchangeSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddSBPDCLTieLinesExchangeErrorAction(error)])
                    )
                )
                );
                @Effect()
                addSBPDCLTieLinesExchangeSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add SBPDCLTieLinesExchange',
                             detail: 'SBPDCL Tie Lines Exchange has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSBPDCLTieLinesExchangeError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add SBPDCLTieLinesExchange',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getSBPDCLTieLinesExchange$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetSBPDCLTieLinesExchangeAction) =>
                    this.logbookService.getSBPDCLTieLinesExchange(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetSBPDCLTieLinesExchangeSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetSBPDCLTieLinesExchangeErrorAction(error)])
                    )
                )
                );
                @Effect()
                getSBPDCLTieLinesExchangeSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getSBPDCLTieLinesExchangeError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSBPDCLTieLinesExchange$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateSBPDCLTieLinesExchangeAction) =>
                    this.logbookService.updateSBPDCLTieLinesExchange(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateSBPDCLTieLinesExchangeSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateSBPDCLTieLinesExchangeErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateSBPDCLTieLinesExchangeSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update SBPDCLTieLinesExchange',
                             detail: 'SBPDCL Tie Lines Exchange has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSBPDCLTieLinesExchangeError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update SBPDCLTieLinesExchange',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
