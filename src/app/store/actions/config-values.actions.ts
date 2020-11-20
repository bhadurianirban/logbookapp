import { ConfigValue } from 'src/app/shared/models/config-values.model';

export enum ConfigValueActions {
    ADD_CONFIG_VALUE_TRY = 'ADD_CONFIG_VALUE_TRY',
    ADD_CONFIG_VALUE_SUCCESS = 'ADD_CONFIG_VALUE_SUCCESS',
    ADD_CONFIG_VALUE_ERROR = 'ADD_CONFIG_VALUE_ERROR',

    UPDATE_CONFIG_VALUE_TRY = 'UPDATE_CONFIG_VALUE_TRY',
    UPDATE_CONFIG_VALUE_SUCCESS = 'UPDATE_CONFIG_VALUE_SUCCESS',
    UPDATE_CONFIG_VALUE_ERROR = 'UPDATE_CONFIG_VALUE_ERROR',

    GET_CONFIG_VALUES_TRY = 'GET_CONFIG_VALUES_TRY',
    GET_CONFIG_VALUES_SUCCESS = 'GET_CONFIG_VALUES_SUCCESS',
    GET_CONFIG_VALUES_ERROR = 'GET_CONFIG_VALUES_ERROR'
}

export class AddConfigValueAction {
    readonly type = ConfigValueActions.ADD_CONFIG_VALUE_TRY;
    constructor(public payload?: ConfigValue) {}
}

export class AddConfigValueSuccessAction {
    readonly type = ConfigValueActions.ADD_CONFIG_VALUE_SUCCESS;
    constructor(public payload?: ConfigValue) {}
}

export class AddConfigValueErrorAction {
    readonly type = ConfigValueActions.ADD_CONFIG_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateConfigValueAction {
    readonly type = ConfigValueActions.UPDATE_CONFIG_VALUE_TRY;
    constructor(public payload?: ConfigValue) {}
}

export class UpdateConfigValueSuccessAction {
    readonly type = ConfigValueActions.UPDATE_CONFIG_VALUE_SUCCESS;
    constructor(public payload?: ConfigValue) {}
}

export class UpdateConfigValueErrorAction {
    readonly type = ConfigValueActions.UPDATE_CONFIG_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetConfigValuesAction {
    readonly type = ConfigValueActions.GET_CONFIG_VALUES_TRY;
    constructor() {}
}

export class GetConfigValuesSuccessAction {
    readonly type = ConfigValueActions.GET_CONFIG_VALUES_SUCCESS;
    constructor(public payload?: ConfigValue[]) {}
}

export class GetConfigValuesErrorAction {
    readonly type = ConfigValueActions.GET_CONFIG_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export type ConfigValueActionsUnion = AddConfigValueAction | AddConfigValueSuccessAction | AddConfigValueErrorAction
| UpdateConfigValueAction | UpdateConfigValueSuccessAction | UpdateConfigValueErrorAction
| GetConfigValuesAction | GetConfigValuesSuccessAction | GetConfigValuesErrorAction;
