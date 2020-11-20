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
export class LogbookNBPDCLTieLinesExchangeEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getNBPDCLTieLinesExchange$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetNBPDCLTieLinesExchangeAction) =>
                    this.logbookService.getNBPDCLTieLinesExchange(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetNBPDCLTieLinesExchangeSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetNBPDCLTieLinesExchangeErrorAction(error)])
                    )
                )
                );
                @Effect()
                getNBPDCLTieLinesExchangeSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getNBPDCLTieLinesExchangeError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addNBPDCLTieLinesExchange$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddNBPDCLTieLinesExchangeAction) =>
                    this.logbookService.addNBPDCLTieLinesExchange(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddNBPDCLTieLinesExchangeSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddNBPDCLTieLinesExchangeErrorAction(error)])
                    )
                )
                );
                @Effect()
                addNBPDCLTieLinesExchangeSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add NBPDCLTieLinesExchange',
                             detail: 'NBPDCL Tie Lines Exchange has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addNBPDCLTieLinesExchangeError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add NBPDCLTieLinesExchange',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateNBPDCLTieLinesExchange$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateNBPDCLTieLinesExchangeAction) =>
                    this.logbookService.updateNBPDCLTieLinesExchange(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateNBPDCLTieLinesExchangeSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateNBPDCLTieLinesExchangeErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateNBPDCLTieLinesExchangeSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update NBPDCLTieLinesExchange',
                             detail: 'NBPDCL Tie Lines Exchange has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateNBPDCLTieLinesExchangeError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update NBPDCLTieLinesExchange',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
