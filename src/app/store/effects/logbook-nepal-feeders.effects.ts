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
export class LogbookNepalFeedersEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getNepalFeeders$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.GET_NEPAL_FEEDERS_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetNepalFeedersAction) =>
                    this.logbookService.getNepalFeeders(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetNepalFeedersSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetNepalFeedersErrorAction(error)])
                    )
                )
                );
                @Effect()
                getNepalFeedersSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.GET_NEPAL_FEEDERS_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getNepalFeedersError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.GET_NEPAL_FEEDERS_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addNepalFeeders$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.ADD_NEPAL_FEEDERS_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddNepalFeedersAction) =>
                    this.logbookService.addNepalFeeders(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddNepalFeedersSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddNepalFeedersErrorAction(error)])
                    )
                )
                );
                @Effect()
                addNepalFeedersSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.ADD_NEPAL_FEEDERS_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add Nepal Feeders',
                             detail: 'Nepal Feeders has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addNepalFeedersError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.ADD_NEPAL_FEEDERS_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add Nepal Feeders',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateNepalFeeders$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.UPDATE_NEPAL_FEEDERS_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateNepalFeedersAction) =>
                    this.logbookService.updateNepalFeeders(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateNepalFeedersSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateNepalFeedersErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateNepalFeedersSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.UPDATE_NEPAL_FEEDERS_SUCCESS),
                    mergeMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update Nepal Feeders',
                             detail: 'Nepal Feeders has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateNepalFeedersError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.NepalFeedersActions.UPDATE_NEPAL_FEEDERS_ERROR),
                    mergeMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update Nepal Feeders',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
