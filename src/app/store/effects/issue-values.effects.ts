import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { IssueValuesService  } from 'src/app/master-data/services/issue-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class IssueValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private issueService: IssueValuesService ,
                private messageService: MessageService) {}

    @Effect()
    getIssueValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.GET_ISSUE_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetIssueValuesAction) =>
            this.issueService.getAllIssueData()
                .pipe(
                    map(result => {
                        return new RootActions.GetIssueValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetIssueValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getIssueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.GET_ISSUE_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Issue Values',
                     detail: 'Issue values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getIssueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.GET_ISSUE_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Issue Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addIssueValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.ADD_ISSUE_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions. AddIssueValueAction) =>
        this.issueService.addUpdateIssueData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddIssueValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddIssueValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addIssueValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.ADD_ISSUE_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Issue',
                 detail: 'Issue Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addIssueValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.ADD_ISSUE_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Issue',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateIssueValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.UPDATE_ISSUE_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateIssueValueAction) =>
        this.issueService.addUpdateIssueData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateIssueValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateIssueValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateIssueValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.UPDATE_ISSUE_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Issue',
                 detail: 'Issue Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateIssueValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.UPDATE_ISSUE_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Violation',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    deleteIssueData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.DELETE_ISSUE_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteIssueValuesAction) =>
        this.issueService.deleteIssueData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteIssueValuesSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteIssueValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteIssueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.DELETE_ISSUE_VALUES_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Issue Value',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteIssueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.IssueValueActions.DELETE_ISSUE_VALUES_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Issue Value',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
