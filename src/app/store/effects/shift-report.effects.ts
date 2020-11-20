import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { ShiftReportService } from 'src/app/shared/services/shift-summary.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class ShiftReportsEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private reportService: ShiftReportService,
                private messageService: MessageService) { }

    @Effect()
    downloadShiftSummaryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportsAction.GET_SHIFT_REPORT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.GetShiftReportAction) =>
            this.reportService.getShiftSummaryReport(action.payload.logbookId, action.payload.isExcel)
                .pipe(
                    map(result => {
                        const contentDisposition = result.headers.get('content-disposition');
                        const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                        return new RootActions.GetShiftReportSuccessAction({
                            data: result,
                            isExcel: action.payload.isExcel,
                            fileName: filename
                        });
                    }),
                    catchError(error => [new RootActions.GetShiftReportErrorAction(error)])
                )
        )
    );

    @Effect()
    downloadShiftSummarySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportsAction.GET_SHIFT_REPORT_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Download Shift Summary Report',
                    detail: 'Shift Summary been downloaded successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    downloadShiftSummaryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportsAction.GET_SHIFT_REPORT_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Download Shift Summary Report',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    downloadShiftHandoverAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportsAction.GET_SHIFT_HANDOVER_REPORT_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.GetShiftHandoverReportAction) =>
            this.reportService.getShiftHOReport(action.payload.logbookId, action.payload.isExcel)
                .pipe(
                    map(result => {
                        const contentDisposition = result.headers.get('content-disposition');
                        const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                        return new RootActions.GetShiftHandoverReportSuccessAction({
                            data: result,
                            isExcel: action.payload.isExcel,
                            fileName: filename
                        });
                    }),
                    catchError(error => [new RootActions.GetShiftHandoverReportErrorAction(error)])
                )
        )
    );

    @Effect()
    downloadShiftHandoverSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportsAction.GET_SHIFT_HANDOVER_REPORT_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Download Shift Handover Report',
                    detail: 'Shift Handover has been downloaded successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    downloadShiftHandoverError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.ReportsAction.GET_SHIFT_HANDOVER_REPORT_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Download Shift Handover Report',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
