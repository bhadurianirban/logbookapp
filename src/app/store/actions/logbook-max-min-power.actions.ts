import { LogbookMaxMinPowerDetails } from 'src/app/e-logbook/models/MaxMinPowerDetails.model';

export enum MaxMinPowerActions {
    GET_MAX_MIN_POWER_TRY = 'GET_MAX_MIN_POWER_TRY',
    GET_MAX_MIN_POWER_SUCCESS = 'GET_MAX_MIN_POWER_SUCCESS',
    GET_MAX_MIN_POWER_ERROR = 'GET_MAX_MIN_POWER_ERROR',
    ADD_MAX_MIN_POWER_TRY = 'ADD_MAX_MIN_POWER_TRY',
    ADD_MAX_MIN_POWER_SUCCESS = 'ADD_MAX_MIN_POWER_SUCCESS',
    ADD_MAX_MIN_POWER_ERROR = 'ADD_MAX_MIN_POWER_ERROR',
    UPDATE_MAX_MIN_POWER_TRY = 'UPDATE_MAX_MIN_POWER_TRY',
    UPDATE_MAX_MIN_POWER_SUCCESS = 'UPDATE_MAX_MIN_POWER_SUCCESS',
    UPDATE_MAX_MIN_POWER_ERROR = 'UPDATE_MAX_MIN_POWER_ERROR',
}
export class GetMaxMinPowerAction {
    readonly type = MaxMinPowerActions.GET_MAX_MIN_POWER_TRY;
    constructor(public payload?: string) {}
}

export class GetMaxMinPowerSuccessAction {
    readonly type = MaxMinPowerActions.GET_MAX_MIN_POWER_SUCCESS;
    constructor(public payload?: LogbookMaxMinPowerDetails) {}
}

export class GetMaxMinPowerErrorAction {
    readonly type = MaxMinPowerActions.GET_MAX_MIN_POWER_ERROR;
    constructor(public payload?: any) {}
}
export class AddMaxMinPowerAction {
    readonly type = MaxMinPowerActions.ADD_MAX_MIN_POWER_TRY;
    constructor(public payload?: LogbookMaxMinPowerDetails) {}
}

export class AddMaxMinPowerSuccessAction {
    readonly type = MaxMinPowerActions.ADD_MAX_MIN_POWER_SUCCESS;
    constructor(public payload?: LogbookMaxMinPowerDetails) {}
}

export class AddMaxMinPowerErrorAction {
    readonly type = MaxMinPowerActions.ADD_MAX_MIN_POWER_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateMaxMinPowerAction {
    readonly type = MaxMinPowerActions.UPDATE_MAX_MIN_POWER_TRY;
    constructor(public payload?: LogbookMaxMinPowerDetails) {}
}

export class UpdateMaxMinPowerSuccessAction {
    readonly type = MaxMinPowerActions.UPDATE_MAX_MIN_POWER_SUCCESS;
    constructor(public payload?: LogbookMaxMinPowerDetails) {}
}

export class UpdateMaxMinPowerErrorAction {
    readonly type = MaxMinPowerActions.UPDATE_MAX_MIN_POWER_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookMaxMinPowerActionsUnion = GetMaxMinPowerAction
| GetMaxMinPowerSuccessAction | GetMaxMinPowerErrorAction|AddMaxMinPowerAction
| AddMaxMinPowerSuccessAction | AddMaxMinPowerErrorAction| UpdateMaxMinPowerAction
| UpdateMaxMinPowerSuccessAction | UpdateMaxMinPowerErrorAction;
