import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { MessageService } from 'primeng/api';

@Injectable()
export class DashboardEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private dashboardService: DashboardService,
                private messageService: MessageService) {}

    @Effect()
    getDashboardAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_DATA_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.LoadLogbookDashboardAction) =>
            this.dashboardService.getDashboardData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardDataSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardDataErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardDataSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_DATA_SUCCESS,
             RootActions.DashboardActions.GET_DASHBOARD_DATA_ERROR),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardShutdownsAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_SHUTDOWN_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDashboardShutdownAction) =>
            this.dashboardService.getDashboardShutdownData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardShutdownSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardShutdownErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardShutdownSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_SHUTDOWN_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardShutdownError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_SHUTDOWN_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get Shutdowns',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardOutageAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_OUTAGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDashboardOutageAction) =>
            this.dashboardService.getDashboardOutageData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardOutageSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardOutageErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardOutageSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_OUTAGE_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardOutageError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_OUTAGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get Outage',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardARAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_AUTO_RECLOSE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDashboardAutoRecloseAction) =>
            this.dashboardService.getDashboardAutoRecloseData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardAutoRecloseSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardAutoRecloseErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardARSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_AUTO_RECLOSE_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardARError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_AUTO_RECLOSE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get Auto Reclose',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardFTCAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_FIRST_TIME_CHARGE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDashboardFirstTimeChargeAction) =>
            this.dashboardService.getDashboardFirstTimeChargeData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardFirstTimeChargeSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardFirstTimeChargeErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardFTCSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardFTCError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_FIRST_TIME_CHARGE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get First Time Charge',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardTrippingAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_TRIPPING_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDashboardTrippingAction) =>
            this.dashboardService.getDashboardTrippingData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardTrippingSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardTrippingErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardTrippingSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_TRIPPING_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardTrippingError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_TRIPPING_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get Tripping',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardAntitheftAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_ANTITHEFT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDashboardAntitheftAction) =>
            this.dashboardService.getDashboardAntiTheftData()
            .pipe(
                map(result => {
                    return new RootActions.GetDashboardAntitheftSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDashboardAntitheftErrorAction(error)])
            )
        )
    );

    @Effect()
    getDashboardAntitheftSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_ANTITHEFT_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDashboardAntitheftError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DashboardActions.GET_DASHBOARD_ANTITHEFT_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get Anti Theft',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
