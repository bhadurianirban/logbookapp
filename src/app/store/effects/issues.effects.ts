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
export class LogbookIssueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}

    @Effect()
    addIssue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.ADD_ISSUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddIssueAction) =>
        this.logbookService.addIssue(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddIssueSuccessAction(result);
            }),
                catchError(error => [new RootActions.AddIssueErrorAction(error)])
        )
    )
    );

    @Effect()
    addIssueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.ADD_ISSUE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Issue',
                 detail: 'Issue has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addIssueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.ADD_ISSUE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Issue',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateIssue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.UPDATE_ISSUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateIssueAction) =>
        this.logbookService.updateIssue(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateIssueSuccessAction(result);
            }),
                catchError(error => [new RootActions.UpdateIssueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateIssueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.UPDATE_ISSUE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Issue',
                 detail: 'Issue has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateIssueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.UPDATE_ISSUE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Issue',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteIssue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.DELETE_ISSUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteIssueAction) =>
        this.logbookService.deleteIssue(action.payload)
        .pipe(
            map(result => {
                return new RootActions.DeleteIssueSuccessAction(result);
            }),
                catchError(error => [new RootActions.DeleteIssueErrorAction(error)])
        )
    )
    );

    @Effect()
    deleteIssueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.DELETE_ISSUE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Delete Issue',
                 detail: 'Issue has been deleted successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteIssueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueActions.DELETE_ISSUE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Delete Issue',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
