import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { StatcomFsctcscService } from 'src/app/shared/services/statcom-fsctcsc.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class StatcomFscTcscEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private statcomService: StatcomFsctcscService) {}

    @Effect()
    getFscTcscElements: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FscTcscActions.GET_FSCTCSC_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetFscTcscAction) =>
            this.statcomService.getFsctcscData(action.payload.logbookId)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        return new RootActions.GetDashboardFscTcscSuccessAction(result);
                    } else {
                        return new RootActions.GetFscTcscSuccessAction(result);
                    }
                }),
                    catchError(error => [new RootActions.GetFscTcscErrorAction(error)])
            )
        )
    );

    @Effect()
    getFscTcscSuccess: Observable<Action> = this.actions.pipe(
        ofType(RootActions.FscTcscActions.GET_FSCTCSC_SUCCESS
            || RootActions.FscTcscActions.GET_DASHBOARD_FSCTCSC_SUCCESS
             || RootActions.FscTcscActions.GET_FSCTCSC_ERROR),
        mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getStatcomElements: Observable<Action> = this.actions.pipe(
        ofType(RootActions.StatcomActions.GET_STATCOM_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetStatcomAction) =>
            this.statcomService.getStatcomData(action.payload.logbookId)
            .pipe(
                map(result => {
                    if (action.payload.IsDashboardUpdate) {
                        return new RootActions.GetDashboardStatcomSuccessAction(result);
                    } else {
                        return new RootActions.GetStatcomSuccessAction(result);
                    }

                }),
                    catchError(error => [new RootActions.GetStatcomErrorAction(error)])
            )
        )
    );

    @Effect()
    getStatcomSuccess: Observable<Action> = this.actions.pipe(
        ofType(RootActions.StatcomActions.GET_STATCOM_SUCCESS
            || RootActions.StatcomActions.GET_DASHBOARD_STATCOM_SUCCESS
            || RootActions.StatcomActions.GET_STATCOM_ERROR),
        mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );
}
