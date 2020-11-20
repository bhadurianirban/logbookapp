import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class LogbookMaxMinPowerEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getMaxMinPower$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.GET_MAX_MIN_POWER_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetMaxMinPowerAction) =>
                    this.logbookService.getMaxMinPower(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetMaxMinPowerSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetMaxMinPowerErrorAction(error)])
                    )
                )
                );
                @Effect()
                getMaxMinPowerSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.GET_MAX_MIN_POWER_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getMaxMinPowerError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.GET_MAX_MIN_POWER_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addMaxMinPower$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.ADD_MAX_MIN_POWER_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddMaxMinPowerAction) =>
                    this.logbookService.addMaxMinPower(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddMaxMinPowerSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddMaxMinPowerErrorAction(error)])
                    )
                )
                );
                @Effect()
                addMaxMinPowerSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.ADD_MAX_MIN_POWER_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add MaxMinPowerDetails',
                             detail: 'Max Min Power Details has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addMaxMinPowerError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.ADD_MAX_MIN_POWER_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add MaxMinPowerDetails',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateMaxMinPower$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.UPDATE_MAX_MIN_POWER_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateMaxMinPowerAction) =>
                    this.logbookService.updateMaxMinPower(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateMaxMinPowerSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateMaxMinPowerErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateMaxMinPowerSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.UPDATE_MAX_MIN_POWER_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update MaxMinPowerDetails',
                             detail: 'Max Min Power Details has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateMaxMinPowerError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MaxMinPowerActions.UPDATE_MAX_MIN_POWER_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update MaxMinPowerDetails',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
