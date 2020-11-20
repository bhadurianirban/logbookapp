import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LogbookDashboardService } from 'src/app/e-logbook/services/logbook-dashboard.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class LogbookDashboardEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private dashboardService: LogbookDashboardService) {}

    @Effect()
    getLogbookDashboard$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.LoadLogbookDashboardAction) =>
            this.dashboardService.getLogbookDashboardData(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.LoadLogbookDashboardSuccessAction(result);
                }),
                catchError(error => [new RootActions.LoadLogbookDashboardErrorAction(error)])
            )
        )
    );

    @Effect()
    getLogbookDashboardSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getLogbookDashboardError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_ERROR),
        switchMap((error: any) => {
            return [new LoadingIndicatorAction(false)];
        })
    );

}
