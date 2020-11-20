import { ViolationValue } from 'src/app/shared/models/violation-value.model';

export enum ViolationValueActions {
    ADD_VIOLATION_VALUE_TRY = 'ADD_VIOLATION_VALUE_TRY',
    ADD_VIOLATION_VALUE_SUCCESS = 'ADD_VIOLATION_VALUE_SUCCESS',
    ADD_VIOLATION_VALUE_ERROR = 'ADD_VIOLATION_VALUE_ERROR',

    UPDATE_VIOLATION_VALUE_TRY = 'UPDATE_VIOLATION_VALUE_TRY',
    UPDATE_VIOLATION_VALUE_SUCCESS = 'UPDATE_VIOLATION_VALUE_SUCCESS',
    UPDATE_VIOLATION_VALUE_ERROR = 'UPDATE_VIOLATION_VALUE_ERROR',

    GET_VIOLATION_VALUES_TRY = 'GET_VIOLATION_VALUE_TRY',
    GET_VIOLATION_VALUES_SUCCESS = 'GET_VIOLATION_VALUES_SUCCESS',
    GET_VIOLATION_VALUES_ERROR = 'GET_VIOLATION_VALUES_ERROR',

    DELETE_VIOLATION_VALUES_TRY = 'DELETE_VIOLATION_VALUES_TRY',
    DELETE_VIOLATION_VALUES_SUCCESS = 'DELETE_VIOLATION_VALUES_SUCCESS',
    DELETE_VIOLATION_VALUES_ERROR = 'DELETE_VIOLATION_VALUES_ERROR'
}

export class AddViolationValueAction {
    readonly type = ViolationValueActions.ADD_VIOLATION_VALUE_TRY;
    constructor(public payload?: ViolationValue) {}
}

export class AddViolationValueSuccessAction {
    readonly type = ViolationValueActions.ADD_VIOLATION_VALUE_SUCCESS;
    constructor(public payload?: ViolationValue) {}
}

export class AddViolationValueErrorAction {
    readonly type = ViolationValueActions.ADD_VIOLATION_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateViolationValueAction {
    readonly type = ViolationValueActions.UPDATE_VIOLATION_VALUE_TRY;
    constructor(public payload?: ViolationValue) {}
}

export class UpdateViolationValueSuccessAction {
    readonly type = ViolationValueActions.UPDATE_VIOLATION_VALUE_SUCCESS;
    constructor(public payload?: ViolationValue) {}
}

export class UpdateViolationValueErrorAction {
    readonly type = ViolationValueActions.UPDATE_VIOLATION_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetViolationValuesAction {
    readonly type = ViolationValueActions.GET_VIOLATION_VALUES_TRY;
    constructor() {}
}

export class GetViolationValuesSuccessAction {
    readonly type = ViolationValueActions.GET_VIOLATION_VALUES_SUCCESS;
    constructor(public payload?: ViolationValue[]) {}
}

export class GetViolationValuesErrorAction {
    readonly type = ViolationValueActions.GET_VIOLATION_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteViolationValuesAction {
    readonly type = ViolationValueActions.DELETE_VIOLATION_VALUES_TRY;
    constructor(public payload?: any) { }
}
export class DeleteViolationValuesSuccessAction {
    readonly type = ViolationValueActions.DELETE_VIOLATION_VALUES_SUCCESS;
    constructor(public payload?: ViolationValue) { }
}
export class DeleteViolationValuesErrorAction {
    readonly type = ViolationValueActions.DELETE_VIOLATION_VALUES_ERROR;
    constructor(public payload?: any) { }
}

export type ViolationValueActionsUnion = AddViolationValueAction | AddViolationValueSuccessAction | AddViolationValueErrorAction
| UpdateViolationValueAction | UpdateViolationValueSuccessAction | UpdateViolationValueErrorAction
// tslint:disable-next-line: max-line-length
| GetViolationValuesAction | GetViolationValuesSuccessAction | GetViolationValuesErrorAction| DeleteViolationValuesAction| DeleteViolationValuesSuccessAction| DeleteViolationValuesErrorAction;
