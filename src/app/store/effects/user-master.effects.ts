import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { UserManagementService } from 'src/app/user-manage/services/user-management.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class UserMasterEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private userManagementService: UserManagementService,
                private messageService: MessageService) { }

    @Effect()
    getUserMasterData: Observable<Action> = this.actions.pipe(
    ofType(RootActions.UserManagementRepositoryActions.GET_USERS_TRY),
    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
    mergeMap((action: RootActions.GetUserAction) =>
        this.userManagementService.getUsers()
            .pipe(
            map(result => {
                return new RootActions.GetUserSuccessAction(result);
            }),
            catchError(error => [new RootActions.GetUserErrorAction(error)])
            )
        )
    );

    @Effect()
    getUserMasterSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.GET_USERS_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'User Management',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getUserMasterError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.GET_USERS_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'User Management',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createUserMasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.CREATE_USERS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.CreateUserAction) =>
            this.userManagementService.addUserData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.CreateUserSuccessAction(result);
                }),
                catchError(error => [new RootActions.CreateUserErrorAction(error)])
                )
        )
    );

    @Effect()
    createUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.CREATE_USERS_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'User Management',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.CREATE_USERS_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'User Management',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteUserMasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.DELETE_USERS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteUserAction) =>
            this.userManagementService.deleteUserData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteUserSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteUserErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.DELETE_USERS_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'User Management',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserManagementRepositoryActions.DELETE_USERS_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'User Management',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

}
