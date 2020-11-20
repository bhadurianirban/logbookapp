import { DesignationValue } from 'src/app/shared/models/designation-value.model';

export enum DesignationValueActions {
    ADD_DESIGNATION_VALUE_TRY = 'ADD_DESIGNATION_VALUE_TRY',
    ADD_DESIGNATION_VALUE_SUCCESS = 'ADD_DESIGNATION_VALUE_SUCCESS',
    ADD_DESIGNATION_VALUE_ERROR = 'ADD_DESIGNATION_VALUE_ERROR',

    UPDATE_DESIGNATION_VALUE_TRY = 'UPDATE_DESIGNATION_VALUE_TRY',
    UPDATE_DESIGNATION_VALUE_SUCCESS = 'UPDATE_DESIGNATION_VALUE_SUCCESS',
    UPDATE_DESIGNATION_VALUE_ERROR = 'UPDATE_DESIGNATION_VALUE_ERROR',

    GET_DESIGNATION_VALUES_TRY = 'GET_DESIGNATION_VALUE_TRY',
    GET_DESIGNATION_VALUES_SUCCESS = 'GET_DESIGNATION_VALUES_SUCCESS',
    GET_DESIGNATION_VALUES_ERROR = 'GET_DESIGNATION_VALUES_ERROR',

    DELETE_DESIGNATION_VALUES_TRY = 'DELETE_DESIGNATION_VALUES_TRY',
    DELETE_DESIGNATION_VALUES_SUCCESS = 'DELETE_DESIGNATION_VALUES_SUCCESS',
    DELETE_DESIGNATION_VALUES_ERROR = 'DELETE_DESIGNATION_VALUES_ERROR',

    SAVE_DESIGNATION_VALUE_TRY = 'SAVE_DESIGNATION_VALUE_TRY',
    SAVE_DESIGNATION_VALUE_SUCCESS = 'SAVE_DESIGNATION_VALUE_SUCCESS',
    SAVE_DESIGNATION_VALUE_ERROR = 'SAVE_DESIGNATION_VALUE_ERROR',
}

export class AddDesignationValueAction {
    readonly type = DesignationValueActions.ADD_DESIGNATION_VALUE_TRY;
    constructor(public payload?: DesignationValue) {}
}

export class AddDesignationValueSuccessAction {
    readonly type = DesignationValueActions.ADD_DESIGNATION_VALUE_SUCCESS;
    constructor(public payload?: DesignationValue) {}
}

export class AddDesignationValueErrorAction {
    readonly type = DesignationValueActions.ADD_DESIGNATION_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateDesignationValueAction {
    readonly type = DesignationValueActions.UPDATE_DESIGNATION_VALUE_TRY;
    constructor(public payload?: DesignationValue) {}
}

export class UpdateDesignationValueSuccessAction {
    readonly type = DesignationValueActions.UPDATE_DESIGNATION_VALUE_SUCCESS;
    constructor(public payload?: DesignationValue) {}
}

export class UpdateDesignationValueErrorAction {
    readonly type = DesignationValueActions.UPDATE_DESIGNATION_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetDesignationValuesAction {
    readonly type = DesignationValueActions.GET_DESIGNATION_VALUES_TRY;
    constructor() {}
}

export class GetDesignationValuesSuccessAction {
    readonly type = DesignationValueActions.GET_DESIGNATION_VALUES_SUCCESS;
    constructor(public payload?: DesignationValue[]) {}
}

export class GetDesignationValuesErrorAction {
    readonly type = DesignationValueActions.GET_DESIGNATION_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteDesignationValuesAction {
    readonly type = DesignationValueActions.DELETE_DESIGNATION_VALUES_TRY;
    constructor(public payload?: any) { }
}
export class DeleteDesignationValuesSuccessAction {
    readonly type = DesignationValueActions.DELETE_DESIGNATION_VALUES_SUCCESS;
    constructor(public payload?: DesignationValue) { }
}
export class DeleteDesignationValuesErrorAction {
    readonly type = DesignationValueActions.DELETE_DESIGNATION_VALUES_ERROR;
    constructor(public payload?: any) { }
}
export class SaveDesignationValueAction {
    readonly type = DesignationValueActions.SAVE_DESIGNATION_VALUE_TRY;
    constructor(public payload?: DesignationValue[]) {}
}

export class SaveDesignationValueSuccessAction {
    readonly type = DesignationValueActions.SAVE_DESIGNATION_VALUE_SUCCESS;
    constructor(public payload?: DesignationValue[]) {}
}

export class SaveDesignationValueErrorAction {
    readonly type = DesignationValueActions.SAVE_DESIGNATION_VALUE_ERROR;
    constructor(public payload?: any) {}
}
export type DesignationValueActionsUnion = AddDesignationValueAction | AddDesignationValueSuccessAction | AddDesignationValueErrorAction
| UpdateDesignationValueAction | UpdateDesignationValueSuccessAction | UpdateDesignationValueErrorAction
// tslint:disable-next-line: max-line-length
| GetDesignationValuesAction | GetDesignationValuesSuccessAction | GetDesignationValuesErrorAction| DeleteDesignationValuesAction| DeleteDesignationValuesSuccessAction| DeleteDesignationValuesErrorAction| SaveDesignationValueAction | SaveDesignationValueSuccessAction | SaveDesignationValueErrorAction;
