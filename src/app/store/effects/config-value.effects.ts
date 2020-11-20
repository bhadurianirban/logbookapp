import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { ConfigValuesService } from 'src/app/master-data/services/config-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class ConfigValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private configService: ConfigValuesService,
                private messageService: MessageService) {}

    @Effect()
    getConfigValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.GET_CONFIG_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetConfigValuesAction) =>
            this.configService.getAllConfigData()
                .pipe(
                    map(result => {
                        return new RootActions.GetConfigValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetConfigValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getConfigSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.GET_CONFIG_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Config Values',
                     detail: 'Config values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getConfigError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.GET_CONFIG_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Config Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addConfogValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.ADD_CONFIG_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddConfigValueAction) =>
        this.configService.addUpdateConfigData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddConfigValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddConfigValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addConfogValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.ADD_CONFIG_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Config',
                 detail: 'Config Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addConfogValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.ADD_CONFIG_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Config',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateConfogValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.UPDATE_CONFIG_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateConfigValueAction) =>
        this.configService.addUpdateConfigData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateConfigValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateConfigValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateConfogValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.UPDATE_CONFIG_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Config',
                 detail: 'Config Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateConfogValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ConfigValueActions.UPDATE_CONFIG_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Config',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
