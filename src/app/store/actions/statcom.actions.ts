import { STATCOM } from 'src/app/shared/models/logbook.model';

export enum StatcomActions {
    GET_STATCOM_TRY = 'GET_STATCOM_TRY',
    GET_STATCOM_SUCCESS = 'GET_STATCOM_SUCCESS',
    GET_DASHBOARD_STATCOM_SUCCESS = 'GET_DASHBOARD_STATCOM_SUCCESS',
    GET_STATCOM_ERROR = 'GET_STATCOM_ERROR'
}

export class GetStatcomAction {
    readonly type = StatcomActions.GET_STATCOM_TRY;
    constructor(public payload?: { logbookId: string, IsDashboardUpdate: boolean }) {}
}

export class GetStatcomSuccessAction {
    readonly type = StatcomActions.GET_STATCOM_SUCCESS;
    constructor(public payload?: STATCOM[]) {}
}

export class GetDashboardStatcomSuccessAction {
    readonly type = StatcomActions.GET_DASHBOARD_STATCOM_SUCCESS;
    constructor(public payload?: STATCOM[]) {}
}

export class GetStatcomErrorAction {
    readonly type = StatcomActions.GET_STATCOM_ERROR;
    constructor(public payload?: any) {}
}

export type StatcomActionsUnion = GetStatcomAction | GetStatcomErrorAction | GetStatcomSuccessAction
| GetDashboardStatcomSuccessAction;
