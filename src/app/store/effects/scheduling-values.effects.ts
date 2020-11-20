import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { SchedulingValuesService } from 'src/app/master-data/services/scheduling-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class SchedulingValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private schedulingService: SchedulingValuesService,
                private messageService: MessageService) {}

    @Effect()
    getSchedulingValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.GET_SCHEDULING_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetSchedulingValuesAction) =>
            this.schedulingService.getAllSchedulingData()
                .pipe(
                    map(result => {
                        return new RootActions.GetSchedulingValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetSchedulingValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getSchedulingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.GET_SCHEDULING_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Scheduling Values',
                     detail: 'Scheduling values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getSchedulingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.GET_SCHEDULING_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Scheduling Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addSchedulingValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.ADD_SCHEDULING_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions. AddSchedulingValueAction) =>
        this.schedulingService.addUpdateSchedulingData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddSchedulingValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddSchedulingValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addSchedulingValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.ADD_SCHEDULING_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Scheduling',
                 detail: 'Scheduling Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addSchedulingValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.ADD_SCHEDULING_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Scheduling',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateSchedulingValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.UPDATE_SCHEDULING_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateSchedulingValueAction) =>
        this.schedulingService.addUpdateSchedulingData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateSchedulingValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateSchedulingValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateSchedulingValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.UPDATE_SCHEDULING_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Scheduling',
                 detail: 'Scheduling Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateSchedulingValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.UPDATE_SCHEDULING_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Scheduling',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    deleteSchedulingData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.DELETE_SCHEDULING_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteSchedulingValuesAction) =>
        this.schedulingService.deleteSchedulingData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteSchedulingValuesSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteSchedulingValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteSchedulingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.DELETE_SCHEDULING_VALUES_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Scheduling Value',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteSchedulingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingValueActions.DELETE_SCHEDULING_VALUES_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Scheduling Value',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
