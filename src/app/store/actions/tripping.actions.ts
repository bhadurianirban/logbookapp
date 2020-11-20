import { TrippingModel } from 'src/app/shared/models/tripping.model';

export enum TrippingActions {
    ADD_TRIPPING_TRY = 'ADD_TRIPPING_TRY',
    ADD_TRIPPING_SUCCESS = 'ADD_TRIPPING_SUCCESS',
    ADD_TRIPPING_ERROR = 'ADD_TRIPPING_ERROR',
    UPDATE_TRIPPING_TRY = 'UPDATE_TRIPPING_TRY',
    UPDATE_LOGBOOK_TRIPPING_SUCCESS = 'UPDATE_LOGBOOK_TRIPPING_SUCCESS',
    UPDATE_DASHBOARD_TRIPPING_SUCCESS = 'UPDATE_DASHBOARD_TRIPPING_SUCCESS',
    UPDATE_HISTORY_TRIPPING_SUCCESS = 'UPDATE_HISTORY_TRIPPING_SUCCESS',
    UPDATE_TRIPPING_ERROR = 'UPDATE_TRIPPING_ERROR',
    DELETE_TRIPPING_TRY = 'DELETE_TRIPPING_TRY',
    DELETE_TRIPPING_SUCCESS = 'DELETE_TRIPPING_SUCCESS',
    DELETE_HISTORY_TRIPPING_SUCCESS = 'DELETE_HISTORY_TRIPPING_SUCCESS',
    DELETE_TRIPPING_ERROR = 'DELETE_TRIPPING_ERROR'
}

export class AddTrippingAction {
    readonly type = TrippingActions.ADD_TRIPPING_TRY;
    constructor(public payload?: TrippingModel[]) {}
}

export class AddTrippingSuccessAction {
    readonly type = TrippingActions.ADD_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel[]) {}
}

export class AddTrippingErrorAction {
    readonly type = TrippingActions.ADD_TRIPPING_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateTrippingAction {
    readonly type = TrippingActions.UPDATE_TRIPPING_TRY;
    constructor(public payload?: TrippingModel) {}
}

export class UpdateLogbookTrippingSuccessAction {
    readonly type = TrippingActions.UPDATE_LOGBOOK_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel) {}
}

export class UpdateDashboardTrippingSuccessAction {
    readonly type = TrippingActions.UPDATE_DASHBOARD_TRIPPING_SUCCESS;
    constructor(public payload?: { updatedData?: TrippingModel, previousData?: TrippingModel }) {}
}

export class UpdateHistoryTrippingSuccessAction {
    readonly type = TrippingActions.UPDATE_HISTORY_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel) {}
}

export class UpdateTrippingErrorAction {
    readonly type = TrippingActions.UPDATE_TRIPPING_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteTrippingAction {
    readonly type = TrippingActions.DELETE_TRIPPING_TRY;
    constructor(public payload?: TrippingModel) {}
}

export class DeleteTrippingSuccessAction {
    readonly type = TrippingActions.DELETE_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel) {}
}

export class DeleteHistoryTrippingSuccessAction {
    readonly type = TrippingActions.DELETE_HISTORY_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel) {}
}

export class DeleteTrippingErrorAction {
    readonly type = TrippingActions.DELETE_TRIPPING_ERROR;
    constructor(public payload?: any) {}
}

export type TrippingActionsUnion = AddTrippingAction | AddTrippingSuccessAction | AddTrippingErrorAction
| UpdateTrippingAction | UpdateLogbookTrippingSuccessAction | UpdateDashboardTrippingSuccessAction | UpdateTrippingErrorAction
| DeleteTrippingAction | DeleteTrippingSuccessAction | DeleteTrippingErrorAction
| UpdateHistoryTrippingSuccessAction | DeleteHistoryTrippingSuccessAction;
