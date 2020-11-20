import { TrippingValue } from 'src/app/shared/models/tripping-value.model';

export enum TrippingValueActions {
    ADD_TRIPPING_VALUE_TRY = 'ADD_TRIPPING_VALUE_TRY',
    ADD_TRIPPING_VALUE_SUCCESS = 'ADD_TRIPPING_VALUE_SUCCESS',
    ADD_TRIPPING_VALUE_ERROR = 'ADD_TRIPPING_VALUE_ERROR',

    UPDATE_TRIPPING_VALUE_TRY = 'UPDATE_TRIPPING_VALUE_TRY',
    UPDATE_TRIPPING_VALUE_SUCCESS = 'UPDATE_TRIPPING_VALUE_SUCCESS',
    UPDATE_TRIPPING_VALUE_ERROR = 'UPDATE_TRIPPING_VALUE_ERROR',

    GET_TRIPPING_VALUES_TRY = 'GET_TRIPPING_VALUE_TRY',
    GET_TRIPPING_VALUES_SUCCESS = 'GET_TRIPPING_VALUES_SUCCESS',
    GET_TRIPPING_VALUES_ERROR = 'GET_TRIPPING_VALUES_ERROR',

    DELETE_TRIPPING_VALUES_TRY = 'DELETE_TRIPPING_VALUES_TRY',
    DELETE_TRIPPING_VALUES_SUCCESS = 'DELETE_TRIPPING_VALUES_SUCCESS',
    DELETE_TRIPPING_VALUES_ERROR = 'DELETE_TRIPPING_VALUES_ERROR'
}

export class AddTrippingValueAction {
    readonly type = TrippingValueActions.ADD_TRIPPING_VALUE_TRY;
    constructor(public payload?: TrippingValue ) {}
}

export class AddTrippingValueSuccessAction {
    readonly type = TrippingValueActions.ADD_TRIPPING_VALUE_SUCCESS;
    constructor(public payload?: TrippingValue ) {}
}

export class AddTrippingValueErrorAction {
    readonly type = TrippingValueActions.ADD_TRIPPING_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateTrippingValueAction {
    readonly type = TrippingValueActions.UPDATE_TRIPPING_VALUE_TRY;
    constructor(public payload?: TrippingValue ) {}
}

export class UpdateTrippingValueSuccessAction {
    readonly type = TrippingValueActions.UPDATE_TRIPPING_VALUE_SUCCESS;
    constructor(public payload?: TrippingValue ) {}
}

export class UpdateTrippingValueErrorAction {
    readonly type = TrippingValueActions.UPDATE_TRIPPING_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetTrippingValuesAction {
    readonly type = TrippingValueActions.GET_TRIPPING_VALUES_TRY;
    constructor() {}
}

export class GetTrippingValuesSuccessAction {
    readonly type = TrippingValueActions.GET_TRIPPING_VALUES_SUCCESS;
    constructor(public payload?: TrippingValue []) {}
}

export class GetTrippingValuesErrorAction {
    readonly type = TrippingValueActions.GET_TRIPPING_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteTrippingValuesAction {
    readonly type = TrippingValueActions.DELETE_TRIPPING_VALUES_TRY;
    constructor(public payload?: any) { }
}
export class DeleteTrippingValuesSuccessAction {
    readonly type = TrippingValueActions.DELETE_TRIPPING_VALUES_SUCCESS;
    constructor(public payload?: TrippingValue ) { }
}
export class DeleteTrippingValuesErrorAction {
    readonly type = TrippingValueActions.DELETE_TRIPPING_VALUES_ERROR;
    constructor(public payload?: any) { }
}

export type TrippingValueActionsUnion = AddTrippingValueAction | AddTrippingValueSuccessAction | AddTrippingValueErrorAction
| UpdateTrippingValueAction | UpdateTrippingValueSuccessAction | UpdateTrippingValueErrorAction
// tslint:disable-next-line: max-line-length
| GetTrippingValuesAction | GetTrippingValuesSuccessAction | GetTrippingValuesErrorAction| DeleteTrippingValuesAction| DeleteTrippingValuesSuccessAction| DeleteTrippingValuesErrorAction;
