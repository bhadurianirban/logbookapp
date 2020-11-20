import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { ReportService } from 'src/app/reports/services/report.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction } from '../actions/index';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ReportsEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private reportService: ReportService) {}

    @Effect()
    getViolationMessageReportAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.VIOLATION_MESSAGE_REPORT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetViolationMessagesTry) =>
            this.reportService.getViolationMessageReport(action.payload.fromDate, action.payload.toDate)
            .pipe(
                map(result => {
                    return new RootActions.GetViolationMessageSuccess(result);
                }),
                    catchError(error => [new RootActions.GetViolationMessageFail(error)])
            )
        )
    );

    @Effect()
    getViolationMessageReportSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.VIOLATION_MESSAGE_REPORT_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    geViolationMessageReportError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.VIOLATION_MESSAGE_REPORT_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getElementWiseReportAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.ELEMENT_WISE_REPORT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetElementWiseReportTry) =>
            this.reportService.getElementWiseReport(action.payload.fromDate, action.payload.toDate, action.payload.elementId)
            .pipe(
                map(result => {
                    return new RootActions.GetElementWiseReportSuccess(result);
                }),
                    catchError(error => [new RootActions.GetElementWiseReportFail(error)])
            )
        )
    );

    @Effect()
    getElementWiseReportSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.ELEMENT_WISE_REPORT_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getElementWiseReportError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.ELEMENT_WISE_REPORT_FAIL),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    getTieLinesReportAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.TIE_LINES_REPORT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetTieLinesReportTry) =>
            this.reportService.getTieLinesReport(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetTieLinesReportSuccess(result);
                }),
                    catchError(error => [new RootActions.GetTieLinesReportFail(error)])
            )
        )
    );

    @Effect()
    getTieLinesReportSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.TIE_LINES_REPORT_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    geTieLinesReportError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportActions.TIE_LINES_REPORT_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );
}
