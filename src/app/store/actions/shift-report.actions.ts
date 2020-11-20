export enum ReportsAction {
    GET_SHIFT_REPORT_TRY = 'GET_SHIFT_REPORT_TRY',
    GET_SHIFT_REPORT_SUCCESS = 'GET_SHIFT_REPORT_SUCCESS',
    GET_SHIFT_REPORT_ERROR = 'GET_SHIFT_REPORT_ERROR',

    GET_SHIFT_HANDOVER_REPORT_TRY = 'GET_SHIFT_HANDOVER_REPORT_TRY',
    GET_SHIFT_HANDOVER_REPORT_SUCCESS = 'GET_SHIFT_HANDOVER_REPORT_SUCCESS',
    GET_SHIFT_HANDOVER_REPORT_ERROR = 'GET_SHIFT_HANDOVER_REPORT_ERROR'
}

export class GetShiftReportAction {
    readonly type = ReportsAction.GET_SHIFT_REPORT_TRY;
    constructor(public payload?: { logbookId: string, isExcel: boolean }) {}
}

export class GetShiftReportSuccessAction {
    readonly type = ReportsAction.GET_SHIFT_REPORT_SUCCESS;
    constructor(public payload?: { data: any, isExcel: boolean, fileName: string}) {}
}

export class GetShiftReportErrorAction {
    readonly type = ReportsAction.GET_SHIFT_REPORT_ERROR;
    constructor(public payload?: any) {}
}

export class GetShiftHandoverReportAction {
    readonly type = ReportsAction.GET_SHIFT_HANDOVER_REPORT_TRY;
    constructor(public payload?: { logbookId: string, isExcel: boolean }) {}
}

export class GetShiftHandoverReportSuccessAction {
    readonly type = ReportsAction.GET_SHIFT_HANDOVER_REPORT_SUCCESS;
    constructor(public payload?: { data: any, isExcel: boolean, fileName: string}) {}
}

export class GetShiftHandoverReportErrorAction {
    readonly type = ReportsAction.GET_SHIFT_HANDOVER_REPORT_ERROR;
    constructor(public payload?: any) {}
}

export type ReportActionsUnion = GetShiftReportAction | GetShiftReportSuccessAction | GetShiftReportErrorAction
| GetShiftHandoverReportAction | GetShiftHandoverReportSuccessAction | GetShiftHandoverReportErrorAction;
