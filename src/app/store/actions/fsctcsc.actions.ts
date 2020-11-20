import { FSCTCSC } from 'src/app/shared/models/logbook.model';

export enum FscTcscActions {
    GET_FSCTCSC_TRY = 'GET_FSCTCSC_TRY',
    GET_FSCTCSC_SUCCESS = 'GET_FSCTCSC_SUCCESS',
    GET_DASHBOARD_FSCTCSC_SUCCESS = 'GET_DASHBOARD_FSCTCSC_SUCCESS',
    GET_FSCTCSC_ERROR = 'GET_FSCTCSC_ERROR'
}

export class GetFscTcscAction {
    readonly type = FscTcscActions.GET_FSCTCSC_TRY;
    constructor(public payload?: {logbookId: string, IsDashboardUpdate: boolean }) {}
}

export class GetFscTcscSuccessAction {
    readonly type = FscTcscActions.GET_FSCTCSC_SUCCESS;
    constructor(public payload?: FSCTCSC[]) {}
}

export class GetDashboardFscTcscSuccessAction {
    readonly type = FscTcscActions.GET_DASHBOARD_FSCTCSC_SUCCESS;
    constructor(public payload?: FSCTCSC[]) {}
}

export class GetFscTcscErrorAction {
    readonly type = FscTcscActions.GET_FSCTCSC_ERROR;
    constructor(public payload?: any) {}
}

export type FscTcscActionsUnion = GetFscTcscAction | GetFscTcscErrorAction | GetFscTcscSuccessAction
| GetDashboardFscTcscSuccessAction;
