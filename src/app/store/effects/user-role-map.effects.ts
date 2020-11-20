import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { UserRoleService } from 'src/app/user-manage/services/user-role.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class UserRoleEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private userroleService: UserRoleService,
                private messageService: MessageService) { }

    @Effect()
    getUserRoleData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.GET_USERROLEMAPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetUserRoleMapAction) =>
            this.userroleService.getUserRoles()
                .pipe(
                map(result => {
                    return new RootActions.GetUserRoleMapSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetUserRoleMapErrorAction(error)])
                )
        )
    );

    @Effect()
    getUserRoleSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.GET_USERROLEMAPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'User Management',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getUserRoleError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.GET_USERROLEMAPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'User Management',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createUserRoleData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.CREATE_USERROLEMAPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.CreateUserRoleMapAction) =>
            this.userroleService.addUserRoleData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.CreateUserRoleMapSuccessAction(result);
                }),
                catchError(error => [new RootActions.CreateUserRoleMapErrorAction(error)])
                )
        )
    );

    @Effect()
    createUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.CREATE_USERROLEMAPPING_SUCCESS),
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
        ofType(RootActions.UserRoleMapActions.CREATE_USERROLEMAPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'User Management',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteUserRoleData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.DELETE_USERROLEMAPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteUserRoleMapAction) =>
            this.userroleService.deleteUserRoleData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteUserRoleMapSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteUserRoleMapErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteUserRoleSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.DELETE_USERROLEMAPPING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'User Management',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteUserRoleError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserRoleMapActions.DELETE_USERROLEMAPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'User Management',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
