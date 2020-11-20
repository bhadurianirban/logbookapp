import { LogbookSystemReport } from 'src/app/e-logbook/models/SystemReport.model';

export enum SystemReportActions {
    GET_SYSTEM_REPORT_TRY = 'GET_SYSTEM_REPORT_TRY',
    GET_SYSTEM_REPORT_SUCCESS = 'GET_SYSTEM_REPORT_SUCCESS',
    GET_SYSTEM_REPORT_ERROR = 'GET_SYSTEM_REPORT_ERROR',
    ADD_SYSTEM_REPORT_TRY = 'ADD_SYSTEM_REPORT_TRY',
    ADD_SYSTEM_REPORT_SUCCESS = 'ADD_SYSTEM_REPORT_SUCCESS',
    ADD_SYSTEM_REPORT_ERROR = 'ADD_SYSTEM_REPORT_ERROR',
    UPDATE_SYSTEM_REPORT_TRY = 'UPDATE_SYSTEM_REPORT_TRY',
    UPDATE_SYSTEM_REPORT_SUCCESS = 'UPDATE_SYSTEM_REPORT_SUCCESS',
    UPDATE_SYSTEM_REPORT_ERROR = 'UPDATE_SYSTEM_REPORT_ERROR',
}
export class GetSystemReportAction {
    readonly type = SystemReportActions.GET_SYSTEM_REPORT_TRY;
    constructor(public payload?: string) {}
}

export class GetSystemReportSuccessAction {
    readonly type = SystemReportActions.GET_SYSTEM_REPORT_SUCCESS;
    constructor(public payload?: LogbookSystemReport) {}
}

export class GetSystemReportErrorAction {
    readonly type = SystemReportActions.GET_SYSTEM_REPORT_ERROR;
    constructor(public payload?: any) {}
}
export class AddSystemReportAction {
    readonly type = SystemReportActions.ADD_SYSTEM_REPORT_TRY;
    constructor(public payload?: LogbookSystemReport) {}
}

export class AddSystemReportSuccessAction {
    readonly type = SystemReportActions.ADD_SYSTEM_REPORT_SUCCESS;
    constructor(public payload?: LogbookSystemReport) {}
}

export class AddSystemReportErrorAction {
    readonly type = SystemReportActions.ADD_SYSTEM_REPORT_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateSystemReportAction {
    readonly type = SystemReportActions.UPDATE_SYSTEM_REPORT_TRY;
    constructor(public payload?: LogbookSystemReport) {}
}

export class UpdateSystemReportSuccessAction {
    readonly type = SystemReportActions.UPDATE_SYSTEM_REPORT_SUCCESS;
    constructor(public payload?: LogbookSystemReport) {}
}

export class UpdateSystemReportErrorAction {
    readonly type = SystemReportActions.UPDATE_SYSTEM_REPORT_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookSystemReportActionsUnion = GetSystemReportAction
| GetSystemReportSuccessAction | GetSystemReportErrorAction|AddSystemReportAction
| AddSystemReportSuccessAction | AddSystemReportErrorAction| UpdateSystemReportAction
| UpdateSystemReportSuccessAction | UpdateSystemReportErrorAction;
