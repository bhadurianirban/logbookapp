import { LogbookSolarPower } from 'src/app/e-logbook/models/SolarPower.model';

export enum SolarPowerPlantsActions {
    GET_SOLAR_POWER_PLANTS_TRY = 'GET_SOLAR_POWER_PLANTS_TRY',
    GET_SOLAR_POWER_PLANTS_SUCCESS = 'GET_SOLAR_POWER_PLANTS_SUCCESS',
    GET_SOLAR_POWER_PLANTS_ERROR = 'GET_SOLAR_POWER_PLANTS_ERROR',
    ADD_SOLAR_POWER_PLANTS_TRY = 'ADD_SOLAR_POWER_PLANTS_TRY',
    ADD_SOLAR_POWER_PLANTS_SUCCESS = 'ADD_SOLAR_POWER_PLANTS_SUCCESS',
    ADD_SOLAR_POWER_PLANTS_ERROR = 'ADD_SOLAR_POWER_PLANTS_ERROR',
    UPDATE_SOLAR_POWER_PLANTS_TRY = 'UPDATE_SOLAR_POWER_PLANTS_TRY',
    UPDATE_SOLAR_POWER_PLANTS_SUCCESS = 'UPDATE_SOLAR_POWER_PLANTS_SUCCESS',
    UPDATE_SOLAR_POWER_PLANTS_ERROR = 'UPDATE_SOLAR_POWER_PLANTS_ERROR',
}
export class GetSolarPowerPlantsAction {
    readonly type = SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_TRY;
    constructor(public payload?: string) {}
}

export class GetSolarPowerPlantsSuccessAction {
    readonly type = SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_SUCCESS;
    constructor(public payload?: LogbookSolarPower) {}
}

export class GetSolarPowerPlantsErrorAction {
    readonly type = SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_ERROR;
    constructor(public payload?: any) {}
}
export class AddSolarPowerPlantsAction {
    readonly type = SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_TRY;
    constructor(public payload?: LogbookSolarPower) {}
}

export class AddSolarPowerPlantsSuccessAction {
    readonly type = SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_SUCCESS;
    constructor(public payload?: LogbookSolarPower) {}
}

export class AddSolarPowerPlantsErrorAction {
    readonly type = SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateSolarPowerPlantsAction {
    readonly type = SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_TRY;
    constructor(public payload?: LogbookSolarPower) {}
}

export class UpdateSolarPowerPlantsSuccessAction {
    readonly type = SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_SUCCESS;
    constructor(public payload?: LogbookSolarPower) {}
}

export class UpdateSolarPowerPlantsErrorAction {
    readonly type = SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookSolarPowerPlantsActionsUnion = GetSolarPowerPlantsAction
| GetSolarPowerPlantsSuccessAction | GetSolarPowerPlantsErrorAction|AddSolarPowerPlantsAction
| AddSolarPowerPlantsSuccessAction | AddSolarPowerPlantsErrorAction| UpdateSolarPowerPlantsAction
| UpdateSolarPowerPlantsSuccessAction | UpdateSolarPowerPlantsErrorAction;
