import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class SchedulingEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) { }

    @Effect()
    addScheduling$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.ADD_SCHEDULING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddSchedulingAction) =>
            this.logbookService.addScheduling(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.AddSchedulingSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.AddSchedulingErrorAction(error)])
                )
        )
    );

    @Effect()
    addSchedulingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.ADD_SCHEDULING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Add Scheduling',
                    detail: 'Scheduling has been added successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addSchedulingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.ADD_SCHEDULING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Add Scheduling',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateScheduling$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.UPDATE_SCHEDULING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateSchedulingAction) =>
            this.logbookService.updateScheduling(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.UpdateSchedulingSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.UpdateSchedulingErrorAction(error)])
                )
        )
    );

    @Effect()
    updateSchedulingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.UPDATE_SCHEDULING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Update Scheduling',
                    detail: 'Scheduling has been updated successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateSchedulingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.UPDATE_SCHEDULING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Update Scheduling',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteScheduling$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.DELETE_SCHEDULING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.DeleteSchedulingAction) =>
            this.logbookService.deleteScheduling(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.DeleteSchedulingSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.DeleteSchedulingErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteSchedulingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.DELETE_SCHEDULING_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Delete Scheduling',
                    detail: 'Scheduling has been deleted successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteSchedulingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SchedulingActions.DELETE_SCHEDULING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Delete Scheduling',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
