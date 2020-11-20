import { AutoRecloseModel } from 'src/app/shared/models/auto-reclose.model';

export enum AutoRecloseActions {
    ADD_AUTO_RECLOSE_TRY = 'ADD_AUTO_RECLOSE_TRY',
    ADD_AUTO_RECLOSE_SUCCESS = 'ADD_AUTO_RECLOSE_SUCCESS',
    ADD_AUTO_RECLOSE_ERROR = 'ADD_AUTO_RECLOSE_ERROR',
    UPDATE_AUTO_RECLOSE_TRY = 'UPDATE_AUTO_RECLOSE_TRY',
    UPDATE_LOGBOOK_AUTO_RECLOSE_SUCCESS = 'UPDATE_LOGBOOK_AUTO_RECLOSE_SUCCESS',
    UPDATE_DASHBOARD_AUTO_RECLOSE_SUCCESS = 'UPDATE_DASHBOARD_AUTO_RECLOSE_SUCCESS',
    UPDATE_HISTORY_AUTO_RECLOSE_SUCCESS = 'UPDATE_HISTORY_AUTO_RECLOSE_SUCCESS',
    UPDATE_AUTO_RECLOSE_ERROR = 'UPDATE_AUTO_RECLOSE_ERROR',
    DELETE_AUTO_RECLOSE_TRY = 'DELETE_AUTO_RECLOSE_TRY',
    DELETE_AUTO_RECLOSE_SUCCESS = 'DELETE_AUTO_RECLOSE_SUCCESS',
    DELETE_HISTOEY_AUTO_RECLOSE_SUCCESS = 'DELETE_HISTOEY_AUTO_RECLOSE_SUCCESS',
    DELETE_AUTO_RECLOSE_ERROR = 'DELETE_AUTO_RECLOSE_ERROR'
}

export class AddAutoRecloseAction {
    readonly type = AutoRecloseActions.ADD_AUTO_RECLOSE_TRY;
    constructor(public payload?: AutoRecloseModel[]) {}
}

export class AddAutoRecloseSuccessAction {
    readonly type = AutoRecloseActions.ADD_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel[]) {}
}

export class AddAutoRecloseErrorAction {
    readonly type = AutoRecloseActions.ADD_AUTO_RECLOSE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateAutoRecloseAction {
    readonly type = AutoRecloseActions.UPDATE_AUTO_RECLOSE_TRY;
    constructor(public payload?: AutoRecloseModel) {}
}

export class UpdateLogbookAutoRecloseSuccessAction {
    readonly type = AutoRecloseActions.UPDATE_LOGBOOK_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel) {}
}

export class UpdateDashboardAutoRecloseSuccessAction {
    readonly type = AutoRecloseActions.UPDATE_DASHBOARD_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: { updatedData?: AutoRecloseModel, previousData?: AutoRecloseModel }) {}
}

export class UpdateHistoryAutoRecloseSuccessAction {
    readonly type = AutoRecloseActions.UPDATE_HISTORY_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel) {}
}

export class UpdateAutoRecloseErrorAction {
    readonly type = AutoRecloseActions.UPDATE_AUTO_RECLOSE_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteAutoRecloseAction {
    readonly type = AutoRecloseActions.DELETE_AUTO_RECLOSE_TRY;
    constructor(public payload?: AutoRecloseModel) {}
}

export class DeleteAutoRecloseSuccessAction {
    readonly type = AutoRecloseActions.DELETE_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel) {}
}

export class DeleteHistoryAutoRecloseSuccessAction {
    readonly type = AutoRecloseActions.DELETE_HISTOEY_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel) {}
}

export class DeleteAutoRecloseErrorAction {
    readonly type = AutoRecloseActions.DELETE_AUTO_RECLOSE_ERROR;
    constructor(public payload?: any) {}
}

export type AutoRecloseActionsUnion = AddAutoRecloseAction | AddAutoRecloseSuccessAction | AddAutoRecloseErrorAction
| UpdateAutoRecloseAction | UpdateLogbookAutoRecloseSuccessAction | UpdateDashboardAutoRecloseSuccessAction | UpdateAutoRecloseErrorAction
| DeleteAutoRecloseAction | DeleteAutoRecloseSuccessAction | DeleteAutoRecloseErrorAction
| UpdateHistoryAutoRecloseSuccessAction | DeleteHistoryAutoRecloseSuccessAction;
