import { ConstituentValue } from 'src/app/shared/models/constituent-value.model';

export enum ConstituentValueActions {
    ADD_CONSTITUENT_VALUE_TRY = 'ADD_CONSTITUENT_VALUE_TRY',
    ADD_CONSTITUENT_VALUE_SUCCESS = 'ADD_CONSTITUENT_VALUE_SUCCESS',
    ADD_CONSTITUENT_VALUE_ERROR = 'ADD_CONSTITUENT_VALUE_ERROR',

    UPDATE_CONSTITUENT_VALUE_TRY = 'UPDATE_CONSTITUENT_VALUE_TRY',
    UPDATE_CONSTITUENT_VALUE_SUCCESS = 'UPDATE_CONSTITUENT_VALUE_SUCCESS',
    UPDATE_CONSTITUENT_VALUE_ERROR = 'UPDATE_CONSTITUENT_VALUE_ERROR',

    GET_CONSTITUENT_VALUES_TRY = 'GET_CONSTITUENT_VALUE_TRY',
    GET_CONSTITUENT_VALUES_SUCCESS = 'GET_CONSTITUENT_VALUES_SUCCESS',
    GET_CONSTITUENT_VALUES_ERROR = 'GET_CONSTITUENT_VALUES_ERROR',

    GET_GRIDS_VALUES_TRY = 'GET_GRIDS_VALUES_TRY',
    GET_GRIDS_VALUES_SUCCESS = 'GET_GRIDS_VALUES_SUCCESS',
    GET_GRIDS_VALUES_ERROR = 'GET_GRIDS_VALUES_ERROR',

    DELETE_CONSTITUENT_VALUES_TRY = 'DELETE_CONSTITUENT_VALUES_TRY',
    DELETE_CONSTITUENT_VALUES_SUCCESS = 'DELETE_CONSTITUENT_VALUES_SUCCESS',
    DELETE_CONSTITUENT_VALUES_ERROR = 'DELETE_CONSTITUENT_VALUES_ERROR'
}

export class AddConstituentValueAction {
    readonly type = ConstituentValueActions.ADD_CONSTITUENT_VALUE_TRY;
    constructor(public payload?: ConstituentValue) {}
}

export class AddConstituentValueSuccessAction {
    readonly type = ConstituentValueActions.ADD_CONSTITUENT_VALUE_SUCCESS;
    constructor(public payload?: ConstituentValue) {}
}

export class AddConstituentValueErrorAction {
    readonly type = ConstituentValueActions.ADD_CONSTITUENT_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateConstituentValueAction {
    readonly type = ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_TRY;
    constructor(public payload?: ConstituentValue) {}
}

export class UpdateConstituentValueSuccessAction {
    readonly type = ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_SUCCESS;
    constructor(public payload?: ConstituentValue) {}
}

export class UpdateConstituentValueErrorAction {
    readonly type = ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetConstituentValuesAction {
    readonly type = ConstituentValueActions.GET_CONSTITUENT_VALUES_TRY;
    constructor(public payload?: any) {}
}

export class GetConstituentValuesSuccessAction {
    readonly type = ConstituentValueActions.GET_CONSTITUENT_VALUES_SUCCESS;
    constructor(public payload?: ConstituentValue[]) {}
}

export class GetConstituentValuesErrorAction {
    readonly type = ConstituentValueActions.GET_CONSTITUENT_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class GetGridsValuesAction {
    readonly type = ConstituentValueActions.GET_GRIDS_VALUES_TRY;
    constructor(public payload?: any) {}
}

export class GetGridsValuesSuccessAction {
    readonly type = ConstituentValueActions.GET_GRIDS_VALUES_SUCCESS;
    constructor(public payload?: ConstituentValue[]) {}
}

export class GetGridsValuesErrorAction {
    readonly type = ConstituentValueActions.GET_GRIDS_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteConstituentValuesAction {
    readonly type = ConstituentValueActions.DELETE_CONSTITUENT_VALUES_TRY;
    constructor(public payload?: any) { }
}
export class DeleteConstituentValuesSuccessAction {
    readonly type = ConstituentValueActions.DELETE_CONSTITUENT_VALUES_SUCCESS;
    constructor(public payload?: ConstituentValue) { }
}
export class DeleteConstituentValuesErrorAction {
    readonly type = ConstituentValueActions.DELETE_CONSTITUENT_VALUES_ERROR;
    constructor(public payload?: any) { }
}

export type ConstituentValueActionsUnion = AddConstituentValueAction | AddConstituentValueSuccessAction | AddConstituentValueErrorAction
| UpdateConstituentValueAction | UpdateConstituentValueSuccessAction | UpdateConstituentValueErrorAction
// tslint:disable-next-line: max-line-length
| GetConstituentValuesAction | GetConstituentValuesSuccessAction | GetConstituentValuesErrorAction| DeleteConstituentValuesAction| DeleteConstituentValuesSuccessAction| DeleteConstituentValuesErrorAction;
