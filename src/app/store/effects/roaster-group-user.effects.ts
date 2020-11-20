import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { RoasterGroupUserService } from 'src/app/duty-roster/services/roaster-group-user.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class RoasterGroupUserEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private roasterGroupUserService: RoasterGroupUserService,
                private messageService: MessageService) { }

    @Effect()
    getGroupUserMasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.GET_ROASTER_GROUP_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetRoasterGroupUserAction) =>
            this.roasterGroupUserService.getRoasterGroupUserData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.GetRoasterGroupUserSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetRoasterGroupUserErrorAction(error)])
                )
        )
    );

    @Effect()
    getGroupUserMasterDataSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.GET_ROASTER_GROUP_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Roster Data',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getGroupUserMasterDataError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.GET_ROASTER_GROUP_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Roster Data',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createGroupUserMasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.CreateRoasterGroupUserAction) =>
            this.roasterGroupUserService.addRoasterGroupUserData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.CreateRoasterGroupUserSuccessAction(result);
                }),
                catchError(error => [new RootActions.CreateRoasterGroupUserErrorAction(error)])
                )
        )
    );

    @Effect()
    createGroupUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Roster Data',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createGroupUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Roster Data',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteGroupUserMasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteRoasterGroupUserAction) =>
            this.roasterGroupUserService.deleteRoasterGroupUserData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteRoasterGroupUserSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteRoasterGroupUserErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteGroupUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Roster Data',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteGroupUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Roster Data',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

}

