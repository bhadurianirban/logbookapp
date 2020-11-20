import { LogbookSystemReportNet } from 'src/app/e-logbook/models/SystemReportNet.model';

export enum SystemReportNetActions {
    GET_SYSTEM_REPORT_NET_TRY = 'GET_SYSTEM_REPORT_NET_TRY',
    GET_SYSTEM_REPORT_NET_SUCCESS = 'GET_SYSTEM_REPORT_NET_SUCCESS',
    GET_SYSTEM_REPORT_NET_ERROR = 'GET_SYSTEM_REPORT_NET_ERROR',
    ADD_SYSTEM_REPORT_NET_TRY = 'ADD_SYSTEM_REPORT_NET_TRY',
    ADD_SYSTEM_REPORT_NET_SUCCESS = 'ADD_SYSTEM_REPORT_NET_SUCCESS',
    ADD_SYSTEM_REPORT_NET_ERROR = 'ADD_SYSTEM_REPORT_NET_ERROR',
    UPDATE_SYSTEM_REPORT_NET_TRY = 'UPDATE_SYSTEM_REPORT_NET_TRY',
    UPDATE_SYSTEM_REPORT_NET_SUCCESS = 'UPDATE_SYSTEM_REPORT_NET_SUCCESS',
    UPDATE_SYSTEM_REPORT_NET_ERROR = 'UPDATE_SYSTEM_REPORT_NET_ERROR',
}
export class GetSystemReportNetAction {
    readonly type = SystemReportNetActions.GET_SYSTEM_REPORT_NET_TRY;
    constructor(public payload?: string) {}
}

export class GetSystemReportNetSuccessAction {
    readonly type = SystemReportNetActions.GET_SYSTEM_REPORT_NET_SUCCESS;
    constructor(public payload?: LogbookSystemReportNet) {}
}

export class GetSystemReportNetErrorAction {
    readonly type = SystemReportNetActions.GET_SYSTEM_REPORT_NET_ERROR;
    constructor(public payload?: any) {}
}
export class AddSystemReportNetAction {
    readonly type = SystemReportNetActions.ADD_SYSTEM_REPORT_NET_TRY;
    constructor(public payload?: LogbookSystemReportNet) {}
}

export class AddSystemReportNetSuccessAction {
    readonly type = SystemReportNetActions.ADD_SYSTEM_REPORT_NET_SUCCESS;
    constructor(public payload?: LogbookSystemReportNet) {}
}

export class AddSystemReportNetErrorAction {
    readonly type = SystemReportNetActions.ADD_SYSTEM_REPORT_NET_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateSystemReportNetAction {
    readonly type = SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_TRY;
    constructor(public payload?: LogbookSystemReportNet) {}
}

export class UpdateSystemReportNetSuccessAction {
    readonly type = SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_SUCCESS;
    constructor(public payload?: LogbookSystemReportNet) {}
}

export class UpdateSystemReportNetErrorAction {
    readonly type = SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookSystemReportNetActionsUnion = GetSystemReportNetAction
| GetSystemReportNetSuccessAction | GetSystemReportNetErrorAction|AddSystemReportNetAction
| AddSystemReportNetSuccessAction | AddSystemReportNetErrorAction| UpdateSystemReportNetAction
| UpdateSystemReportNetSuccessAction | UpdateSystemReportNetErrorAction;
