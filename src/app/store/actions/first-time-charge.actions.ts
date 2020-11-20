import { FirstTimeChargeModel } from '../../shared/models/first-time-charge.model';

export enum FirstTimeChargeActions {
    ADD_FIRST_TIME_CHARGE_TRY = 'ADD_FIRST_TIME_CHARGE_TRY',
    ADD_FIRST_TIME_CHARGE_SUCCESS = 'ADD_FIRST_TIME_CHARGE_SUCCESS',
    ADD_FIRST_TIME_CHARGE_ERROR = 'ADD_FIRST_TIME_CHARGE_ERROR',
    UPDATE_FIRST_TIME_CHARGE_TRY = 'UPDATE_FIRST_TIME_CHARGE_TRY',
    UPDATE_LOGBOOK_FIRST_TIME_CHARGE_SUCCESS = 'UPDATE_LOGBOOK_FIRST_TIME_CHARGE_SUCCESS',
    UPDATE_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS = 'UPDATE_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS',
    UPDATE_HISTORY_FIRST_TIME_CHARGE_SUCCESS = 'UPDATE_HISTORY_FIRST_TIME_CHARGE_SUCCESS',
    UPDATE_FIRST_TIME_CHARGE_ERROR = 'UPDATE_FIRST_TIME_CHARGE_ERROR',
    DELETE_FIRST_TIME_CHARGE_TRY = 'DELETE_FIRST_TIME_CHARGE_TRY',
    DELETE_FIRST_TIME_CHARGE_SUCCESS = 'DELETE_FIRST_TIME_CHARGE_SUCCESS',
    DELETE_HISTOEY_FIRST_TIME_CHARGE_SUCCESS = 'DELETE_HISTOEY_FIRST_TIME_CHARGE_SUCCESS',
    DELETE_FIRST_TIME_CHARGE_ERROR = 'DELETE_FIRST_TIME_CHARGE_ERROR'
}

export class AddFirstTimeChargeAction {
    readonly type = FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_TRY;
    constructor(public payload?: FirstTimeChargeModel[]) {}
}

export class AddFirstTimeChargeSuccessAction {
    readonly type = FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel[]) {}
}

export class AddFirstTimeChargeErrorAction {
    readonly type = FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateFirstTimeChargeAction {
    readonly type = FirstTimeChargeActions.UPDATE_FIRST_TIME_CHARGE_TRY;
    constructor(public payload?: FirstTimeChargeModel) {}
}

export class UpdateLogbookFirstTimeChargeSuccessAction {
    readonly type = FirstTimeChargeActions.UPDATE_LOGBOOK_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel) {}
}

export class UpdateDashboardFirstTimeChargeSuccessAction {
    readonly type = FirstTimeChargeActions.UPDATE_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: { updatedData?: FirstTimeChargeModel, previousData?: FirstTimeChargeModel }) {}
}

export class UpdateHistoryFirstTimeChargeSuccessAction {
    readonly type = FirstTimeChargeActions.UPDATE_HISTORY_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel) {}
}

export class UpdateFirstTimeChargeErrorAction {
    readonly type = FirstTimeChargeActions.UPDATE_FIRST_TIME_CHARGE_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteFirstTimeChargeAction {
    readonly type = FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_TRY;
    constructor(public payload?: FirstTimeChargeModel) {}
}

export class DeleteFirstTimeChargeSuccessAction {
    readonly type = FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel) {}
}

export class DeleteHistoryFirstTimeChargeSuccessAction {
    readonly type = FirstTimeChargeActions.DELETE_HISTOEY_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel) {}
}

export class DeleteFirstTimeChargeErrorAction {
    readonly type = FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_ERROR;
    constructor(public payload?: any) {}
}

export type FirstTimeChargeActionsUnion = AddFirstTimeChargeAction | AddFirstTimeChargeSuccessAction | AddFirstTimeChargeErrorAction
| UpdateFirstTimeChargeAction | UpdateLogbookFirstTimeChargeSuccessAction | UpdateDashboardFirstTimeChargeSuccessAction | UpdateFirstTimeChargeErrorAction
| DeleteFirstTimeChargeAction | DeleteFirstTimeChargeSuccessAction | DeleteFirstTimeChargeErrorAction
| UpdateHistoryFirstTimeChargeSuccessAction | DeleteHistoryFirstTimeChargeSuccessAction;
