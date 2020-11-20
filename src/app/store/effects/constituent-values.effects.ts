import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { ConstituentValuesService } from 'src/app/master-data/services/constituent-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class  ConstituentValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private constituentService: ConstituentValuesService,
                private messageService: MessageService) {}

    @Effect()
    getConstituentValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.GET_CONSTITUENT_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetConstituentValuesAction) =>
            this.constituentService.getAllConstituentData()
                .pipe(
                    map(result => {
                        return new RootActions.GetConstituentValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetConstituentValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getConstituentSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.GET_CONSTITUENT_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Constituent Values',
                     detail: 'Owner values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getConstituentError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.GET_CONSTITUENT_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Constituent Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addConstituentValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.ADD_CONSTITUENT_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions. AddConstituentValueAction) =>
        this.constituentService.addUpdateConstituentData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddConstituentValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddConstituentValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addConstituentValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.ADD_CONSTITUENT_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Owner',
                 detail: 'Owner Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addConstituentValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.ADD_CONSTITUENT_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Error',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateConstituentValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateConstituentValueAction) =>
        this.constituentService.addUpdateConstituentData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateConstituentValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateConstituentValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateConstituentValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Owner',
                 detail: 'Owner Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateConstituentValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Owner',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    deleteConstituentData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.DELETE_CONSTITUENT_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteConstituentValuesAction) =>
        this.constituentService.deleteConstituentData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteConstituentValuesSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteConstituentValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteConstituentSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.DELETE_CONSTITUENT_VALUES_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Owner Value',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteConstituentError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConstituentValueActions.DELETE_CONSTITUENT_VALUES_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Owner Value',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
