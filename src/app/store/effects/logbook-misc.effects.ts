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
export class LogbookMiscEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getMisc$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MiscActions.GET_MISC_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetMiscAction) =>
                    this.logbookService.getMisc(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetMiscSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetMiscErrorAction(error)])
                    )
                )
                );
                @Effect()
                getMiscSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MiscActions.GET_MISC_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getMiscError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MiscActions.GET_MISC_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addMisc$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MiscActions.ADD_MISC_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddMiscAction) =>
                    this.logbookService.addMisc(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddMiscSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddMiscErrorAction(error)])
                    )
                )
                );
                @Effect()
                addMiscSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MiscActions.ADD_MISC_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add Misc',
                             detail: 'Misc has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addMiscError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.MiscActions.ADD_MISC_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add Misc',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
