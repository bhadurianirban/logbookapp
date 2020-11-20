import { Action } from '@ngrx/store';
import { IViolationMessageReport, IElementWiseReport, ITieLinesReport } from 'src/app/reports/reports.model';

export enum ReportActions {
    VIOLATION_MESSAGE_REPORT_TRY = 'VIOLATION_MESSAGE_REPORT_TRY',
    VIOLATION_MESSAGE_REPORT_SUCCESS = 'VIOLATION_MESSAGE_REPORT_SUCCESS',
    VIOLATION_MESSAGE_REPORT_ERROR = 'VIOLATION_MESSAGE_REPORT_ERROR',

    ELEMENT_WISE_REPORT_TRY = 'ELEMENT_WISE_REPORT_TRY',
    ELEMENT_WISE_REPORT_SUCCESS = 'ELEMENT_WISE_REPORT_SUCCESS',
    ELEMENT_WISE_REPORT_FAIL = 'ELEMENT_WISE_REPORT_FAIL',

    TIE_LINES_REPORT_TRY = 'TIE_LINES_REPORT_TRY',
    TIE_LINES_REPORT_SUCCESS = 'TIE_LINES_REPORT_SUCCESS',
    TIE_LINES_REPORT_ERROR = 'TIE_LINES_REPORT_ERROR',

}

export class GetViolationMessagesTry implements Action {
    readonly type = ReportActions.VIOLATION_MESSAGE_REPORT_TRY;
    constructor(public payload: {fromDate: string, toDate: string}) {}
}

export class GetViolationMessageSuccess implements Action {
    readonly type = ReportActions.VIOLATION_MESSAGE_REPORT_SUCCESS;
    constructor(public payload?: IViolationMessageReport[]) {}
}

export class GetViolationMessageFail implements Action {
    readonly type = ReportActions.VIOLATION_MESSAGE_REPORT_ERROR;
    constructor(public payload?: any) {}
}

export class GetElementWiseReportTry implements Action {
    readonly type = ReportActions.ELEMENT_WISE_REPORT_TRY;
    constructor(public payload: {fromDate: string, toDate: string, elementId: number}) {}
}

export class GetElementWiseReportSuccess implements Action {
    readonly type = ReportActions.ELEMENT_WISE_REPORT_SUCCESS;
    constructor(public payload?: IElementWiseReport[]) {}
}

export class GetElementWiseReportFail implements Action {
    readonly type = ReportActions.ELEMENT_WISE_REPORT_FAIL;
    constructor(public payload?: any) {}
}
export class GetTieLinesReportTry implements Action {
    readonly type = ReportActions.TIE_LINES_REPORT_TRY;
    constructor(public payload: string) {}
}

export class GetTieLinesReportSuccess implements Action {
    readonly type = ReportActions.TIE_LINES_REPORT_SUCCESS;
    constructor(public payload?: ITieLinesReport[]) {}
}

export class GetTieLinesReportFail implements Action {
    readonly type = ReportActions.TIE_LINES_REPORT_ERROR;
    constructor(public payload?: any) {}
}

export type ReportsActionUnion = GetViolationMessagesTry | GetViolationMessageSuccess | GetViolationMessageFail
| GetElementWiseReportTry | GetElementWiseReportSuccess | GetElementWiseReportFail | GetTieLinesReportTry | GetTieLinesReportSuccess
|GetTieLinesReportFail;
