import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { ViolationValuesService } from 'src/app/master-data/services/violation-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class ViolationValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private violationService: ViolationValuesService,
                private messageService: MessageService) {}

    @Effect()
    getViolationValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.GET_VIOLATION_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetViolationValuesAction) =>
            this.violationService.getAllViolationData()
                .pipe(
                    map(result => {
                        return new RootActions.GetViolationValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetViolationValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getViolationSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.GET_VIOLATION_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Violation Values',
                     detail: 'Violation values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getViolationError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.GET_VIOLATION_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Violation Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addViolationValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.ADD_VIOLATION_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions. AddViolationValueAction) =>
        this.violationService.addUpdateViolationData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddViolationValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddViolationValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addViolationValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.ADD_VIOLATION_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Config',
                 detail: 'Violation Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addViolationValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.ADD_VIOLATION_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Violation',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateViolationValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.UPDATE_VIOLATION_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateViolationValueAction) =>
        this.violationService.addUpdateViolationData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateViolationValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateViolationValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateViolationValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.UPDATE_VIOLATION_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Violation',
                 detail: 'Violation Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateViolationValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.UPDATE_VIOLATION_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Violation',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    deleteViolationData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.DELETE_VIOLATION_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteViolationValuesAction) =>
        this.violationService.deleteViolationData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteViolationValuesSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteViolationValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteUserRoleSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.DELETE_VIOLATION_VALUES_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Violation Value',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteUserRoleError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationValueActions.DELETE_VIOLATION_VALUES_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Violation Value',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
