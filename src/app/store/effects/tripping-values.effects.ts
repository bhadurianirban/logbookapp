import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { TrippingValuesService } from 'src/app/master-data/services/tripping-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class TrippingValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private trippingService: TrippingValuesService,
                private messageService: MessageService) {}

    @Effect()
    getTrippingValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.GET_TRIPPING_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetViolationValuesAction) =>
            this.trippingService.getAllTrippingData()
                .pipe(
                    map(result => {
                        return new RootActions.GetTrippingValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetTrippingValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.GET_TRIPPING_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Tripping Values',
                     detail: 'Tripping values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getTrippingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.GET_TRIPPING_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Tripping Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addTrippingValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.ADD_TRIPPING_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions. AddTrippingValueAction) =>
        this.trippingService.addUpdateTrippingData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddTrippingValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddTrippingValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addTrippingValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.ADD_TRIPPING_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Tripping',
                 detail: 'Tripping Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addTrippingValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.ADD_TRIPPING_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Tripping',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateTrippingValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.UPDATE_TRIPPING_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateTrippingValueAction) =>
        this.trippingService.addUpdateTrippingData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateTrippingValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateTrippingValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateTrippingValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.UPDATE_TRIPPING_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Tripping',
                 detail: 'Tripping Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateTrippingValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.UPDATE_TRIPPING_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Tripping',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    deleteTrippingData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.DELETE_TRIPPING_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteTrippingValuesAction) =>
        this.trippingService.deleteTrippingData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteTrippingValuesSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteTrippingValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.DELETE_TRIPPING_VALUES_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Tripping Value',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteTrippingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TrippingValueActions.DELETE_TRIPPING_VALUES_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Tripping Value',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
