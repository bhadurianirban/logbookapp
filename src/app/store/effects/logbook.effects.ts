import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import * as RootActions from '../actions/index';
import { tap, catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LogbookEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService,
                private router: Router) {}

    @Effect()
    addLogbook$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.CREATE_LOGBOOK_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.CreateLogbookAction) =>
        this.logbookService.createLogbook(action.payload)
        .pipe(
            map(result => {
                return new RootActions.CreateLogbookSuccessAction(result);
            }),
             catchError(error => [new RootActions.CreateLogbookErrorAction(error)])
        )
    )
    );

    @Effect()
    createLogbookSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.CREATE_LOGBOOK_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Create Logbook',
                 detail: 'Logbook has been created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction()];
        })
    );

    @Effect()
    createLogbookError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.CREATE_LOGBOOK_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Create Logbook',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbook$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.LOAD_LOGBOOK_DETAIL_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.LoadLogbookDetailsAction) =>
            this.logbookService.loadLogbook(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.LoadLogbookDetailsSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.LoadLogbookDetailsErrorAction(error)])
                )
        )
    );

    @Effect()
    updateLogbook$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.UPDATE_LOGBOOK_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateLogbookAction) =>
        this.logbookService.updateLogbook(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateLogbookSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateLogbookErrorAction(error)])
        )
    )
    );

    @Effect()
    updateLogbookSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.UPDATE_LOGBOOK_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Logbook',
                 detail: 'Logbook data has been saved successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateLogbookError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.UPDATE_LOGBOOK_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Logbook',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    submitLogbookAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.SUBMIT_LOGBOOK_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.SubmitLogbookAction) =>
            this.logbookService.submitLogbook(action.payload)
                .pipe(
                    map(result => {
                        this.router.navigate([`/elogbook/dashboard`]);
                        return new RootActions.SubmitLogbookSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.SubmitLogbookErrorAction(error)])
                )
        )
    );

    @Effect()
    submitLogbookSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.SUBMIT_LOGBOOK_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Submit Logbook',
                    detail: 'Logbook has been submitted successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    submitLogbookError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.SUBMIT_LOGBOOK_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Submit Logbook',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
