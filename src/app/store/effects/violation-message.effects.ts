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
export class ViolationMessageEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) { }

    @Effect()
    addViolationMessage$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.ADD_VIOLATION_MESSAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddViolationMessageAction) =>
            this.logbookService.addViolationMessage(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.AddViolationMessageSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.AddViolationMessageErrorAction(error)])
                )
        )
    );

    @Effect()
    addMessageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.ADD_VIOLATION_MESSAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Add Violation Message',
                    detail: 'Violation Message has been added successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addMessageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.ADD_VIOLATION_MESSAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Add Violation Message',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateMessageAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateViolationMessageAction) =>
            this.logbookService.updateViolationMessage(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.UpdateViolationMessageSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.UpdateViolationMessageErrorAction(error)])
                )
        )
    );

    @Effect()
    UpdateMessageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Update Violation Message',
                    detail: 'Violation Message has been updated successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateMessageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Update Violation Message',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteMessageAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.DELETE_VIOLATION_MESSAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteViolationMessageAction) =>
            this.logbookService.deleteViolationMessage(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.DeleteViolationMessageSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.DeleteViolationMessageErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteMessageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.DELETE_VIOLATION_MESSAGE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Delete Violation Message',
                    detail: 'Violation Message has been deleted successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteMessageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.DELETE_VIOLATION_MESSAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Delete Violation Message',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    downloadMessageAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.MESSAGE_DOWNLOAD_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DownloadViolationMessageAction) =>
            this.logbookService.downloadViolationMessage(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.DownloadViolationMessageSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.DownloadViolationMessageErrorAction(error)])
                )
        )
    );

    @Effect()
    downloadMessageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.MESSAGE_DOWNLOAD_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Download Violation Message',
                    detail: 'Violation Message has been downloaded successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    downloadMessageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ViolationMessageActions.MESSAGE_DOWNLOAD_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Download Violation Message',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
