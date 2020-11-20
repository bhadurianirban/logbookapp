import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class PCOEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private outageService: LogbookService,
                private messageService: MessageService) {}

    @Effect()
    addPCOCodeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.ADD_PCO_CODE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddPCOCodeAction) =>
            this.outageService.createPCOCode(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.AddPCOCodeSuccessAction(result);
                }),
                catchError(error => [new RootActions.AddPCOCOdeErrorAction(error)])
            )
        )
    );

    @Effect()
    addPCOCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.ADD_PCO_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Create Power Change Over Code',
                 detail: 'Power Change Over code created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addPCOCodeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.ADD_PCO_CODE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Create Power Change Over Code',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatePCOCodeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.UPDATE_PCO_DATA_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdatePCODataAction) =>
            this.outageService.updatePCOCode(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.UpdatePCODataSuccessAction(result);
                }),
                catchError(error => [new RootActions.UpdatePCODataErrorAction(error)])
            )
        )
    );

    @Effect()
    updatePCOCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.UPDATE_PCO_DATA_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Power Change Over Update',
                 detail: 'Power Change Over data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updatePCOCodeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.UPDATE_PCO_DATA_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Power Change Over',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    cancelPCOCodeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.CANCEL_PCO_CODE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.CancelPCOCodeAction) =>
            this.outageService.cancelPCOCode(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.CancelPCOCodeSuccessAction(result);
                }),
                catchError(error => [new RootActions.CancelPCOCodeErrorAction(error)])
            )
        )
    );

    @Effect()
    cancelPCOCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.CANCEL_PCO_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Power Change Over Code Cancel',
                 detail: 'Power Change Over code cancelled successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    cancelPCOCodeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.PCOActions.CANCEL_PCO_CODE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Power Change Over Code Cancel',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
