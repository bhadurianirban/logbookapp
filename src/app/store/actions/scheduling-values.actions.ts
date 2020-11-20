import { SchedulingValue } from 'src/app/shared/models/scheduling-value.model';

export enum SchedulingValueActions {
    ADD_SCHEDULING_VALUE_TRY = 'ADD_SCHEDULING_VALUE_TRY',
    ADD_SCHEDULING_VALUE_SUCCESS = 'ADD_SCHEDULING_VALUE_SUCCESS',
    ADD_SCHEDULING_VALUE_ERROR = 'ADD_SCHEDULING_VALUE_ERROR',

    UPDATE_SCHEDULING_VALUE_TRY = 'UPDATE_SCHEDULING_VALUE_TRY',
    UPDATE_SCHEDULING_VALUE_SUCCESS = 'UPDATE_SCHEDULING_VALUE_SUCCESS',
    UPDATE_SCHEDULING_VALUE_ERROR = 'UPDATE_SCHEDULING_VALUE_ERROR',

    GET_SCHEDULING_VALUES_TRY = 'GET_SCHEDULING_VALUE_TRY',
    GET_SCHEDULING_VALUES_SUCCESS = 'GET_SCHEDULING_VALUES_SUCCESS',
    GET_SCHEDULING_VALUES_ERROR = 'GET_SCHEDULING_VALUES_ERROR',

    DELETE_SCHEDULING_VALUES_TRY = 'DELETE_SCHEDULING_VALUES_TRY',
    DELETE_SCHEDULING_VALUES_SUCCESS = 'DELETE_SCHEDULING_VALUES_SUCCESS',
    DELETE_SCHEDULING_VALUES_ERROR = 'DELETE_SCHEDULING_VALUES_ERROR'
}

export class AddSchedulingValueAction {
    readonly type = SchedulingValueActions.ADD_SCHEDULING_VALUE_TRY;
    constructor(public payload?: SchedulingValue) {}
}

export class AddSchedulingValueSuccessAction {
    readonly type = SchedulingValueActions.ADD_SCHEDULING_VALUE_SUCCESS;
    constructor(public payload?: SchedulingValue) {}
}

export class AddSchedulingValueErrorAction {
    readonly type = SchedulingValueActions.ADD_SCHEDULING_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateSchedulingValueAction {
    readonly type = SchedulingValueActions.UPDATE_SCHEDULING_VALUE_TRY;
    constructor(public payload?: SchedulingValue) {}
}

export class UpdateSchedulingValueSuccessAction {
    readonly type = SchedulingValueActions.UPDATE_SCHEDULING_VALUE_SUCCESS;
    constructor(public payload?: SchedulingValue) {}
}

export class UpdateSchedulingValueErrorAction {
    readonly type = SchedulingValueActions.UPDATE_SCHEDULING_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetSchedulingValuesAction {
    readonly type = SchedulingValueActions.GET_SCHEDULING_VALUES_TRY;
    constructor() {}
}

export class GetSchedulingValuesSuccessAction {
    readonly type = SchedulingValueActions.GET_SCHEDULING_VALUES_SUCCESS;
    constructor(public payload?: SchedulingValue[]) {}
}

export class GetSchedulingValuesErrorAction {
    readonly type = SchedulingValueActions.GET_SCHEDULING_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteSchedulingValuesAction {
    readonly type = SchedulingValueActions.DELETE_SCHEDULING_VALUES_TRY;
    constructor(public payload?: any) { }
}
export class DeleteSchedulingValuesSuccessAction {
    readonly type = SchedulingValueActions.DELETE_SCHEDULING_VALUES_SUCCESS;
    constructor(public payload?: SchedulingValue) { }
}
export class DeleteSchedulingValuesErrorAction {
    readonly type = SchedulingValueActions.DELETE_SCHEDULING_VALUES_ERROR;
    constructor(public payload?: any) { }
}

export type SchedulingValueActionsUnion = AddSchedulingValueAction | AddSchedulingValueSuccessAction | AddSchedulingValueErrorAction
| UpdateSchedulingValueAction | UpdateSchedulingValueSuccessAction | UpdateSchedulingValueErrorAction
// tslint:disable-next-line: max-line-length
| GetSchedulingValuesAction | GetSchedulingValuesSuccessAction | GetSchedulingValuesErrorAction| DeleteSchedulingValuesAction| DeleteSchedulingValuesSuccessAction| DeleteSchedulingValuesErrorAction;
