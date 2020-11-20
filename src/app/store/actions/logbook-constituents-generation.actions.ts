import { LogbookConstituentsGeneration } from 'src/app/e-logbook/models/ConstituentsGeneration.model';

export enum ConstituentsGenerationActions {
    GET_CONSTITUENTS_GENERATION_TRY = 'GET_CONSTITUENTS_GENERATION_TRY',
    GET_CONSTITUENTS_GENERATION_SUCCESS = 'GET_CONSTITUENTS_GENERATION_SUCCESS',
    GET_CONSTITUENTS_GENERATION_ERROR = 'GET_CONSTITUENTS_GENERATION_ERROR',
    ADD_CONSTITUENTS_GENERATION_TRY = 'ADD_CONSTITUENTS_GENERATION_TRY',
    ADD_CONSTITUENTS_GENERATION_SUCCESS = 'ADD_CONSTITUENTS_GENERATION_SUCCESS',
    ADD_CONSTITUENTS_GENERATION_ERROR = 'ADD_CONSTITUENTS_GENERATION_ERROR',
    UPDATE_CONSTITUENTS_GENERATION_TRY = 'UPDATE_CONSTITUENTS_GENERATION_TRY',
    UPDATE_CONSTITUENTS_GENERATION_SUCCESS = 'UPDATE_CONSTITUENTS_GENERATION_SUCCESS',
    UPDATE_CONSTITUENTS_GENERATION_ERROR = 'UPDATE_CONSTITUENTS_GENERATION_ERROR',
}
export class GetConstituentsGenerationAction {
    readonly type = ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_TRY;
    constructor(public payload?: string) {}
}

export class GetConstituentsGenerationSuccessAction {
    readonly type = ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_SUCCESS;
    constructor(public payload?: LogbookConstituentsGeneration) {}
}

export class GetConstituentsGenerationErrorAction {
    readonly type = ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_ERROR;
    constructor(public payload?: any) {}
}
export class AddConstituentsGenerationAction {
    readonly type = ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_TRY;
    constructor(public payload?: LogbookConstituentsGeneration) {}
}

export class AddConstituentsGenerationSuccessAction {
    readonly type = ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_SUCCESS;
    constructor(public payload?: LogbookConstituentsGeneration) {}
}

export class AddConstituentsGenerationErrorAction {
    readonly type = ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateConstituentsGenerationAction {
    readonly type = ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_TRY;
    constructor(public payload?: LogbookConstituentsGeneration) {}
}

export class UpdateConstituentsGenerationSuccessAction {
    readonly type = ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_SUCCESS;
    constructor(public payload?: LogbookConstituentsGeneration) {}
}

export class UpdateConstituentsGenerationErrorAction {
    readonly type = ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookConstituentsGenerationActionsUnion = GetConstituentsGenerationAction
| GetConstituentsGenerationSuccessAction | GetConstituentsGenerationErrorAction|AddConstituentsGenerationAction
| AddConstituentsGenerationSuccessAction | AddConstituentsGenerationErrorAction|UpdateConstituentsGenerationAction|
UpdateConstituentsGenerationSuccessAction|UpdateConstituentsGenerationErrorAction;
