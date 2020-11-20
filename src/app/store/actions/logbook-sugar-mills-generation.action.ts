import { LogbookSugarMills } from 'src/app/e-logbook/models/SugarMills.model';

export enum SugarMillsGenerationActions {
    GET_SUGAR_MILLS_GENERATION_TRY = 'GET_SUGAR_MILLS_GENERATION_TRY',
    GET_SUGAR_MILLS_GENERATION_SUCCESS = 'GET_SUGAR_MILLS_GENERATION_SUCCESS',
    GET_SUGAR_MILLS_GENERATION_ERROR = 'GET_SUGAR_MILLS_GENERATION_ERROR',
    ADD_SUGAR_MILLS_GENERATION_TRY = 'ADD_SUGAR_MILLS_GENERATION_TRY',
    ADD_SUGAR_MILLS_GENERATION_SUCCESS = 'ADD_SUGAR_MILLS_GENERATION_SUCCESS',
    ADD_SUGAR_MILLS_GENERATION_ERROR = 'ADD_SUGAR_MILLS_GENERATION_ERROR',
    UPDATE_SUGAR_MILLS_GENERATION_TRY = 'UPDATE_SUGAR_MILLS_GENERATION_TRY',
    UPDATE_SUGAR_MILLS_GENERATION_SUCCESS = 'UPDATE_SUGAR_MILLS_GENERATION_SUCCESS',
    UPDATE_SUGAR_MILLS_GENERATION_ERROR = 'UPDATE_SUGAR_MILLS_GENERATION_ERROR',
}
export class GetSugarMillsGenerationAction {
    readonly type = SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_TRY;
    constructor(public payload?: string) {}
}

export class GetSugarMillsGenerationSuccessAction {
    readonly type = SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_SUCCESS;
    constructor(public payload?: LogbookSugarMills) {}
}

export class GetSugarMillsGenerationErrorAction {
    readonly type = SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_ERROR;
    constructor(public payload?: any) {}
}
export class AddSugarMillsGenerationAction {
    readonly type = SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_TRY;
    constructor(public payload?: LogbookSugarMills) {}
}

export class AddSugarMillsGenerationSuccessAction {
    readonly type = SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_SUCCESS;
    constructor(public payload?: LogbookSugarMills) {}
}

export class AddSugarMillsGenerationErrorAction {
    readonly type = SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateSugarMillsGenerationAction {
    readonly type = SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_TRY;
    constructor(public payload?: LogbookSugarMills) {}
}

export class UpdateSugarMillsGenerationSuccessAction {
    readonly type = SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_SUCCESS;
    constructor(public payload?: LogbookSugarMills) {}
}

export class UpdateSugarMillsGenerationErrorAction {
    readonly type = SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookSugarMillsGenerationActionsUnion = GetSugarMillsGenerationAction
| GetSugarMillsGenerationSuccessAction | GetSugarMillsGenerationErrorAction|AddSugarMillsGenerationAction
| AddSugarMillsGenerationSuccessAction | AddSugarMillsGenerationErrorAction| UpdateSugarMillsGenerationAction
| UpdateSugarMillsGenerationSuccessAction | UpdateSugarMillsGenerationErrorAction;
