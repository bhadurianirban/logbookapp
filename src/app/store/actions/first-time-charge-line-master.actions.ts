import { FirstTimeChargeLine } from '../../shared/models/first-time-charge-lines.model';

export enum FirstTimeChargeLineValueActions {
    ADD_LINE_VALUE_TRY = 'ADD_LINE_VALUE_TRY',
    ADD_LINE_VALUE_SUCCESS = 'ADD_LINE_VALUE_SUCCESS',
    ADD_LINE_VALUE_ERROR = 'ADD_LINE_VALUE_ERROR',

    UPDATE_LINE_VALUE_TRY = 'UPDATE_LINE_VALUE_TRY',
    UPDATE_LINE_VALUE_SUCCESS = 'UPDATE_LINE_VALUE_SUCCESS',
    UPDATE_LINE_VALUE_ERROR = 'UPDATE_LINE_VALUE_ERROR',

    GET_LINE_VALUES_TRY = 'GET_LINE_VALUES_TRY',
    GET_LINE_VALUES_SUCCESS = 'GET_LINE_VALUES_SUCCESS',
    GET_LINE_VALUES_ERROR = 'GET_LINE_VALUES_ERROR'
}

export class AddLineValueAction {
    readonly type = FirstTimeChargeLineValueActions.ADD_LINE_VALUE_TRY;
    constructor(public payload?: FirstTimeChargeLine) {}
}

export class AddLineValueSuccessAction {
    readonly type = FirstTimeChargeLineValueActions.ADD_LINE_VALUE_SUCCESS;
    constructor(public payload?: FirstTimeChargeLine) {}
}

export class AddLineValueErrorAction {
    readonly type = FirstTimeChargeLineValueActions.ADD_LINE_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateLineValueAction {
    readonly type = FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_TRY;
    constructor(public payload?: FirstTimeChargeLine) {}
}

export class UpdateLineValueSuccessAction {
    readonly type = FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_SUCCESS;
    constructor(public payload?: FirstTimeChargeLine) {}
}

export class UpdateLineValueErrorAction {
    readonly type = FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetLineValuesAction {
    readonly type = FirstTimeChargeLineValueActions.GET_LINE_VALUES_TRY;
    constructor() {}
}

export class GetLineValuesSuccessAction {
    readonly type = FirstTimeChargeLineValueActions.GET_LINE_VALUES_SUCCESS;
    constructor(public payload?: FirstTimeChargeLine[]) {}
}

export class GetLineValuesErrorAction {
    readonly type = FirstTimeChargeLineValueActions.GET_LINE_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export type FirstTimeChargeLineValueActionsUnion = AddLineValueAction | AddLineValueSuccessAction | AddLineValueErrorAction
| UpdateLineValueAction | UpdateLineValueSuccessAction | UpdateLineValueErrorAction
| GetLineValuesAction | GetLineValuesSuccessAction | GetLineValuesErrorAction;
