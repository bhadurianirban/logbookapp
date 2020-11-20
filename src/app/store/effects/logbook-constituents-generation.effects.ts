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
export class LogbookConstituentsGenerationEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getConstituentsGeneration$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetConstituentsGenerationAction) =>
                    this.logbookService.getConstituentsGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetConstituentsGenerationSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetConstituentsGenerationErrorAction(error)])
                    )
                )
                );
                @Effect()
                getConstituentsGenerationSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getConstituentsGenerationError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addConstituentsGeneration$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddConstituentsGenerationAction) =>
                    this.logbookService.addConstituentsGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddConstituentsGenerationSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddConstituentsGenerationErrorAction(error)])
                    )
                )
                );
                @Effect()
                addConstituentsGenerationSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add ConstituentsGeneration',
                             detail: 'Constituents Generation has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addConstituentsGenerationError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add ConstituentsGeneration',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateConstituentGeneration$: Observable<Action> = this.actions.pipe(
                ofType(RootActions.ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_TRY),
                tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                switchMap((action: RootActions.UpdateConstituentsGenerationAction) =>
                this.logbookService.updateConstituentsGeneration(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.UpdateConstituentsGenerationSuccessAction(result);
                }),
                catchError(error => [new RootActions.UpdateConstituentsGenerationErrorAction(error)])
        )
    )
    );

    @Effect()
    updateConstituentsGenerationSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Constituent Generation',
                 detail: 'Constituent Generation Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateConstituentsGenerationError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Constituent Generation',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    }
