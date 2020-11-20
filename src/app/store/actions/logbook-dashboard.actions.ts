import { LogbookDashboard } from 'src/app/shared/models/logbook-dashboard.model';

export enum LogbookDashboardActions {
    LOAD_LOGBOOK_DASHBOARD_TRY = 'LOAD_LOGBOOK_DASHBOARD_TRY',
    LOAD_LOGBOOK_DASHBOARD_SUCCESS = 'LOAD_LOGBOOK_DASHBOARD_SUCCESS',
    LOAD_LOGBOOK_DASHBOARD_ERROR = 'LOAD_LOGBOOK_DASHBOARD_ERROR'
}

export class LoadLogbookDashboardAction {
    readonly type = LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_TRY;
    constructor(public payload?: string) {}
}

export class LoadLogbookDashboardSuccessAction {
    readonly type = LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_SUCCESS;
    constructor(public payload?: LogbookDashboard[]) {}
}

export class LoadLogbookDashboardErrorAction {
    readonly type = LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookDashboardActionsUnion = LoadLogbookDashboardAction | LoadLogbookDashboardSuccessAction | LoadLogbookDashboardErrorAction;
