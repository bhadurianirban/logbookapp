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
export class LogbookSugarMillsGenerationEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getSugarMillsGeneration$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetSugarMillsGenerationAction) =>
                    this.logbookService.getSugarMillsGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetSugarMillsGenerationSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetSugarMillsGenerationErrorAction(error)])
                    )
                )
                );
                @Effect()
                getSugarMillsGenerationSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getSugarMillsGenerationError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSugarMillsGeneration$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddSugarMillsGenerationAction) =>
                    this.logbookService.addSugarMillsGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddSugarMillsGenerationSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddSugarMillsGenerationErrorAction(error)])
                    )
                )
                );
                @Effect()
                addSugarMillsGenerationSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add SugarMillsGeneration',
                             detail: 'Sugar Mills Generation has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSugarMillsGenerationError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add SugarMillsGeneration',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSugarMillsGeneration$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateSugarMillsGenerationAction) =>
                    this.logbookService.updateSugarMillsGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateSugarMillsGenerationSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateSugarMillsGenerationErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateSugarMillsGenerationSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update SugarMillsGeneration',
                             detail: 'Sugar Mills Generation has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSugarMillsGenerationError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update SugarMillsGeneration',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
