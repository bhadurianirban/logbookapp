import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { RoasterGroupService } from 'src/app/duty-roster/services/roaster-group.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class RoasterGroupEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private roasterGroupService: RoasterGroupService,
                private messageService: MessageService) { }

    @Effect()
    getRoleData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupActions.GET_ROASTER_GROUP_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetRoasterGroupAction) =>
            this.roasterGroupService.getGroups()
                .pipe(
                map(result => {
                    return new RootActions.GetRoasterGroupSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetRoasterGroupErrorAction(error)])
                )
        )
    );

    @Effect()
    getRoleDataSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupActions.GET_ROASTER_GROUP_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Roster Data',
                 detail: 'Action completed successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getRoleDataError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupActions.GET_ROASTER_GROUP_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Roster Data',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}

