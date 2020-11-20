import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class LogbookLoadEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}

    @Effect()
    addLoad$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LoadManagementActions.ADD_LOGBOOK_LOAD_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddLogbookLoadAction) =>
            this.logbookService.addLoad(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.AddLogbookLoadSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.AddLogbookLoadFailAction(error)])
                )
        )
    );

    @Effect()
    addLoadSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LoadManagementActions.ADD_LOGBOOK_LOAD_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Create Load Code',
                    detail: 'Load Code has been added successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addLoadError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LoadManagementActions.ADD_LOGBOOK_LOAD_FAIL),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Create Load Code',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateLoad$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LoadManagementActions.UPDATE_LOGBOOK_LOAD_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateLogbookLoadAction) =>
            this.logbookService.updateLoad(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.UpdateLogbookLoadSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.UpdateLogbookLoadFailAction(error)])
                )
        )
    );

    @Effect()
    updateLoadSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LoadManagementActions.UPDATE_LOGBOOK_LOAD_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Update Load Code Details',
                    detail: 'Load Code details has been updated successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateLoadError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LoadManagementActions.UPDATE_LOGBOOK_LOAD_FAIL),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Update Load Code Details',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    loadLogbookLoadRestrictions$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_RESTRICTION_TRY),
        mergeMap((action: RootActions.GetLogbookRestrictionAction) =>
            this.logbookService.getLogbookRestData(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookRestrictionSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookRestrictionErrorAction(error)])
                )
        )
    );

    @Effect()
    loadLogbookLoadRelease$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogBookActions.GET_LOGBOOK_RELEASE_TRY),
        mergeMap((action: RootActions.GetLogbookReleaseAction) =>
            this.logbookService.getLogbookReleaseData(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.GetLogbookReleaseSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetLogbookReleaseErrorAction(error)])
                )
        )
    );
}
