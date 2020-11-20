import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LoginService } from 'src/app/login/login.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class UserAuthEffects {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private loginService: LoginService,
                private messageService: MessageService,
                private permissionsService: NgxPermissionsService) {}

    @Effect()
    getLoggedInUserEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserAuthActions.GET_LOGGED_IN_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.GetLoggedInUserAction) =>
            this.loginService.login(action.payload.userName, action.payload.password)
            .pipe(
                map(result => {
                    localStorage.setItem('currentUser', JSON.stringify({ user: result }));
                    this.permissionsService.flushPermissions();
                    this.permissionsService.loadPermissions(this.loginService.getLoggedInUser().user.Roles);
                    return new RootActions.GetLoggedInUserSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetLoggedInUserErrorAction(error)])
            )
        )
    );

    @Effect()
    getLoggedInUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserAuthActions.GET_LOGGED_IN_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Login',
                 detail: 'Logged in successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getLoggedInUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.UserAuthActions.GET_LOGGED_IN_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Login',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
