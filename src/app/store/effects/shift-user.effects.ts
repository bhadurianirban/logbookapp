import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class ShiftUserEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) { }

    @Effect()
    deleteShiftUserAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.DELETE_SHIFT_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteShiftUserAction) =>
            this.logbookService.deleteShiftUser(action.payload.logbookId, action.payload.id)
                .pipe(
                    map(result => {
                        return new RootActions.DeleteShiftUserSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.DeleteShiftUserErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteShiftUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.DELETE_SHIFT_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Delete Shift User',
                    detail: 'Shift User has been deleted successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteShiftUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.DELETE_SHIFT_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Delete Shift User',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addShiftUserAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.ADD_SHIFT_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddShiftUserAction) =>
            this.logbookService.addShiftUser(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.AddShiftUserSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.AddShiftUserErrorAction(error)])
                )
        )
    );

    @Effect()
    addShiftUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.ADD_SHIFT_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Add Shift User',
                    detail: 'Shift User has been added successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addShiftUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.ADD_SHIFT_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Add Shift User',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateShiftInchargeAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.UPDATE_SHIFT_INCHARGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateShiftInchargeAction) =>
            this.logbookService.updateShiftIncharge(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.UpdateShiftInchargeSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.UpdateShiftInchargeErrorAction(error)])
                )
        )
    );

    @Effect()
    updateShiftInchargeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.UPDATE_SHIFT_INCHARGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Update Shift Incharge',
                    detail: 'Shift Incharge has been updated successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateShiftInchargeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.UPDATE_SHIFT_INCHARGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Update Shift Incharge',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateShiftHandoverAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.UPDATE_SHIFT_HANDOVER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateShiftHandoverAction) =>
            this.logbookService.updateShiftHandover(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.UpdateShiftHandoverSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.UpdateShiftHandoverErrorAction(error)])
                )
        )
    );

    @Effect()
    updateShiftHandoverSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.UPDATE_SHIFT_HANDOVER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Update Shift Handover',
                    detail: 'Shift Handover has been updated successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateShiftHandoverError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.UPDATE_SHIFT_HANDOVER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Update Shift Handover',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    confirmShiftUserAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.CONFIRM_SHIFT_USER_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.ConfirmShiftUserAction) =>
            this.logbookService.confirmShiftUsers(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.ConfirmShiftUserSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.ConfirmShiftUserErrorAction(error)])
                )
        )
    );

    @Effect()
    ConfirmShiftUserSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.CONFIRM_SHIFT_USER_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Confirm Shift Users',
                    detail: 'Shift users have been confirmed successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    confirmShiftUserError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ShiftUserActions.CONFIRM_SHIFT_USER_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Confirm Shift Users',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
