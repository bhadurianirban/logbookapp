import { LogbookMisc } from 'src/app/e-logbook/models/Misc.model';

export enum MiscActions {
    GET_MISC_TRY = 'GET_MISC_TRY',
    GET_MISC_SUCCESS = 'GET_MISC_SUCCESS',
    GET_MISC_ERROR = 'GET_MISC_ERROR',
    ADD_MISC_TRY = 'ADD_MISC_TRY',
    ADD_MISC_SUCCESS = 'ADD_MISC_SUCCESS',
    ADD_MISC_ERROR = 'ADD_MISC_ERROR',
}
export class GetMiscAction {
    readonly type = MiscActions.GET_MISC_TRY;
    constructor(public payload?: string) {}
}

export class GetMiscSuccessAction {
    readonly type = MiscActions.GET_MISC_SUCCESS;
    constructor(public payload?: LogbookMisc) {}
}

export class GetMiscErrorAction {
    readonly type = MiscActions.GET_MISC_ERROR;
    constructor(public payload?: any) {}
}
export class AddMiscAction {
    readonly type = MiscActions.ADD_MISC_TRY;
    constructor(public payload?: LogbookMisc) {}
}

export class AddMiscSuccessAction {
    readonly type = MiscActions.ADD_MISC_SUCCESS;
    constructor(public payload?: LogbookMisc) {}
}

export class AddMiscErrorAction {
    readonly type = MiscActions.ADD_MISC_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookMiscActionsUnion = GetMiscAction
| GetMiscSuccessAction | GetMiscErrorAction|AddMiscAction
| AddMiscSuccessAction | AddMiscErrorAction;
