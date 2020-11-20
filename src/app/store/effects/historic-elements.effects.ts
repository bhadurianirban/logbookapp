import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { HistoricElementsService } from 'src/app/historic-elements/historic-elements.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class HistoticElementsEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private historicService: HistoricElementsService) {}

    @Effect()
    getOutageHistoryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetOutageHistroyAction) =>
            this.historicService.getOutageHistory(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetOutageHistorySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetOutageHistoryErrorAction(error)])
            )
        )
    );

    @Effect()
    getOutageHistorySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getOutageHistoryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getAutoRecloseHistoryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetAutoRecloseHistroyAction) =>
            this.historicService.getAutoRecloseHistory(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetAutoRecloseHistorySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetAutoRecloseHistoryErrorAction(error)])
            )
        )
    );

    @Effect()
    getAutoRecloseHistorySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getAutoRecloseHistoryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getFirstTimeChargeHistoryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetFirstTimeChargeHistroyAction) =>
            this.historicService.getFirstTimeChargeHistory(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetFirstTimeChargeHistorySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetFirstTimeChargeHistoryErrorAction(error)])
            )
        )
    );

    @Effect()
    getFirstTimeChargeHistorySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getFirstTimeChargeHistoryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getTrippingHistoryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetTrippingHistroyAction) =>
            this.historicService.getTrippingHistory(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetTrippingHistorySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetTrippingHistoryErrorAction(error)])
            )
        )
    );

    @Effect()
    getTrippingHistorySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getTrippingHistoryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getAntitheftHistoryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetAntitheftHistroyAction) =>
            this.historicService.getAntiTheftHistory(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetAntitheftHistorySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetAntitheftHistoryErrorAction(error)])
            )
        )
    );

    @Effect()
    getAntitheftHistorySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getAntitheftHistoryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getShutdownHistoryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetShutdownHistroyAction) =>
            this.historicService.getShutdownHistory(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetShutdownHistorySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetShutdownHistoryErrorAction(error)])
            )
        )
    );

    @Effect()
    getShutdownHistorySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getShutdownHistoryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );
}
