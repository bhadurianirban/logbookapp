import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { RoleService } from 'src/app/user-manage/services/role.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';

@Injectable()
export class RoleEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private roleService: RoleService) { }

    @Effect()
    getRoleData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoleRepositoryActions.GET_ROLES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetRoleAction) =>
            this.roleService.getRoles()
                .pipe(
                map(result => {
                    return new RootActions.GetRoleSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetRoleErrorAction(error)])
                )
        )
    );
}
