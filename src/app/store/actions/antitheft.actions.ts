import { AntiTheftModel } from 'src/app/shared/models/antiTheft.model';

export enum AntiTheftActions {
    ADD_ANTITHEFT_TRY = 'ADD_ANTITHEFT_TRY',
    ADD_ANTITHEFT_SUCCESS = 'ADD_ANTITHEFT_SUCCESS',
    ADD_ANTITHEFT_ERROR = 'ADD_ANTITHEFT_ERROR',
    UPDATE_ANTITHEFT_TRY = 'UPDATE_ANTITHEFT_TRY',
    UPDATE_LOGBOOK_ANTITHEFT_SUCCESS = 'UPDATE_LOGBOOK_ANTITHEFT_SUCCESS',
    UPDATE_DASHBOARD_ANTITHEFT_SUCCESS = 'UPDATE_DASHBOARD_ANTITHEFT_SUCCESS',
    UPDATE_HISTORY_ANTITHEFT_SUCCESS = 'UPDATE_HISTORY_ANTITHEFT_SUCCESS',
    UPDATE_ANTITHEFT_ERROR = 'UPDATE_ANTITHEFT_ERROR',
    DELETE_ANTITHEFT_TRY = 'DELETE_ANTITHEFT_TRY',
    DELETE_ANTITHEFT_SUCCESS = 'DELETE_ANTITHEFT_SUCCESS',
    DELETE_HISTORY_ANTITHEFT_SUCCESS = 'DELETE_HISTORY_ANTITHEFT_SUCCESS',
    DELETE_ANTITHEFT_ERROR = 'DELETE_ANTITHEFT_ERROR'
}

export class AddAntiTheftAction {
    readonly type = AntiTheftActions.ADD_ANTITHEFT_TRY;
    constructor(public payload?: AntiTheftModel[]) {}
}

export class AddAntiTheftSuccessAction {
    readonly type = AntiTheftActions.ADD_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel[]) {}
}

export class AddAntiTheftErrorAction {
    readonly type = AntiTheftActions.ADD_ANTITHEFT_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateAntiTheftAction {
    readonly type = AntiTheftActions.UPDATE_ANTITHEFT_TRY;
    constructor(public payload?: AntiTheftModel) {}
}

export class UpdateLogbookAntiTheftSuccessAction {
    readonly type = AntiTheftActions.UPDATE_LOGBOOK_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel) {}
}

export class UpdateDashboardAntiTheftSuccessAction {
    readonly type = AntiTheftActions.UPDATE_DASHBOARD_ANTITHEFT_SUCCESS;
    constructor(public payload?: { updatedData?: AntiTheftModel, previousData?: AntiTheftModel }) {}
}

export class UpdateHistoryAntiTheftSuccessAction {
    readonly type = AntiTheftActions.UPDATE_HISTORY_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel) {}
}

export class UpdateAntiTheftErrorAction {
    readonly type = AntiTheftActions.UPDATE_ANTITHEFT_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteAntiTheftAction {
    readonly type = AntiTheftActions.DELETE_ANTITHEFT_TRY;
    constructor(public payload?: AntiTheftModel) {}
}

export class DeleteAntiTheftSuccessAction {
    readonly type = AntiTheftActions.DELETE_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel) {}
}

export class DeleteHistoryAntiTheftSuccessAction {
    readonly type = AntiTheftActions.DELETE_HISTORY_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel) {}
}

export class DeleteAntiTheftErrorAction {
    readonly type = AntiTheftActions.DELETE_ANTITHEFT_ERROR;
    constructor(public payload?: any) {}
}

export type AntiTheftActionsUnion = AddAntiTheftAction | AddAntiTheftSuccessAction | AddAntiTheftErrorAction
| UpdateAntiTheftAction | UpdateLogbookAntiTheftSuccessAction | UpdateDashboardAntiTheftSuccessAction | UpdateAntiTheftErrorAction
| DeleteAntiTheftAction | DeleteAntiTheftSuccessAction | DeleteAntiTheftErrorAction | UpdateHistoryAntiTheftSuccessAction
| DeleteHistoryAntiTheftSuccessAction;
