import { OutageModel } from 'src/app/shared/models/outage.model';

export enum OutageActions {
    ADD_OUTAGE_TRY = 'ADD_OUTAGE_TRY',
    ADD_OUTAGE_SUCCESS = 'ADD_OUTAGE_SUCCESS',
    ADD_OUTAGE_ERROR = 'ADD_OUTAGE_ERROR',
    UPDATE_OUTAGE_TRY = 'UPDATE_OUTAGE_TRY',
    UPDATE_LOGBOOK_OUTAGE_SUCCESS = 'UPDATE_LOGBOOK_OUTAGE_SUCCESS',
    UPDATE_DASHBOARD_OUTAGE_SUCCESS = 'UPDATE_DASHBOARD_OUTAGE_SUCCESS',
    UPDATE_HISTORY_OUTAGE_SUCCESS = 'UPDATE_HISTORY_OUTAGE_SUCCESS',
    UPDATE_OUTAGE_ERROR = 'UPDATE_OUTAGE_ERROR',
    DELETE_OUTAGE_TRY = 'DELETE_OUTAGE_TRY',
    DELETE_OUTAGE_SUCCESS = 'DELETE_OUTAGE_SUCCESS',
    DELETE_HISTORY_OUTAGE_SUCCESS = 'DELETE_HISTORY_OUTAGE_SUCCESS',
    DELETE_OUTAGE_ERROR = 'DELETE_OUTAGE_ERROR'
}

export class AddOutageAction {
    readonly type = OutageActions.ADD_OUTAGE_TRY;
    constructor(public payload?: OutageModel[]) {}
}

export class AddOutageSuccessAction {
    readonly type = OutageActions.ADD_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel[]) {}
}

export class AddOutageErrorAction {
    readonly type = OutageActions.ADD_OUTAGE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateOutageAction {
    readonly type = OutageActions.UPDATE_OUTAGE_TRY;
    constructor(public payload?: OutageModel) {}
}

export class UpdateLogbookOutageSuccessAction {
    readonly type = OutageActions.UPDATE_LOGBOOK_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel) {}
}

export class UpdateDashboardOutageSuccessAction {
    readonly type = OutageActions.UPDATE_DASHBOARD_OUTAGE_SUCCESS;
    constructor(public payload?: { updatedData?: OutageModel, previousData?: OutageModel }) {}
}

export class UpdateHistoryOutageSuccessAction {
    readonly type = OutageActions.UPDATE_HISTORY_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel) {}
}

export class UpdateOutageErrorAction {
    readonly type = OutageActions.UPDATE_OUTAGE_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteOutageAction {
    readonly type = OutageActions.DELETE_OUTAGE_TRY;
    constructor(public payload?: OutageModel) {}
}

export class DeleteOutageSuccessAction {
    readonly type = OutageActions.DELETE_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel) {}
}

export class DeleteHistoryOutageSuccessAction {
    readonly type = OutageActions.DELETE_HISTORY_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel) {}
}

export class DeleteOutageErrorAction {
    readonly type = OutageActions.DELETE_OUTAGE_ERROR;
    constructor(public payload?: any) {}
}

export type OutageActionsUnion = AddOutageAction | AddOutageSuccessAction | AddOutageErrorAction
| UpdateOutageAction | UpdateLogbookOutageSuccessAction | UpdateDashboardOutageSuccessAction | UpdateOutageErrorAction
| DeleteOutageAction | DeleteOutageSuccessAction | DeleteOutageErrorAction | UpdateHistoryOutageSuccessAction
| DeleteHistoryOutageSuccessAction;
