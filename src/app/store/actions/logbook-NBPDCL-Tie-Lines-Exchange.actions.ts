import { LogbookNBPDCLTieLineExchange } from 'src/app/e-logbook/models/NBPDCLTieLineExchange.model';

export enum NBPDCLTieLinesExchangeActions {
    GET_NBPDCL_TIE_LINES_EXCHANGE_TRY = 'GET_NBPDCL_TIE_LINES_EXCHANGE_TRY',
    GET_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS = 'GET_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS',
    GET_NBPDCL_TIE_LINES_EXCHANGE_ERROR = 'GET_NBPDCL_TIE_LINES_EXCHANGE_ERROR',
    ADD_NBPDCL_TIE_LINES_EXCHANGE_TRY = 'ADD_NBPDCL_TIE_LINES_EXCHANGE_TRY',
    ADD_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS = 'ADD_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS',
    ADD_NBPDCL_TIE_LINES_EXCHANGE_ERROR = 'ADD_NBPDCL_TIE_LINES_EXCHANGE_ERROR',
    UPDATE_NBPDCL_TIE_LINES_EXCHANGE_TRY = 'UPDATE_NBPDCL_TIE_LINES_EXCHANGE_TRY',
    UPDATE_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS = 'UPDATE_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS',
    UPDATE_NBPDCL_TIE_LINES_EXCHANGE_ERROR = 'UPDATE_NBPDCL_TIE_LINES_EXCHANGE_ERROR',
}
export class GetNBPDCLTieLinesExchangeAction {
    readonly type = NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_TRY;
    constructor(public payload?: string) {}
}

export class GetNBPDCLTieLinesExchangeSuccessAction {
    readonly type = NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS;
    constructor(public payload?: LogbookNBPDCLTieLineExchange) {}
}

export class GetNBPDCLTieLinesExchangeErrorAction {
    readonly type = NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_ERROR;
    constructor(public payload?: any) {}
}
export class AddNBPDCLTieLinesExchangeAction {
    readonly type = NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_TRY;
    constructor(public payload?: LogbookNBPDCLTieLineExchange) {}
}

export class AddNBPDCLTieLinesExchangeSuccessAction {
    readonly type = NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS;
    constructor(public payload?: LogbookNBPDCLTieLineExchange) {}
}

export class AddNBPDCLTieLinesExchangeErrorAction {
    readonly type = NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateNBPDCLTieLinesExchangeAction {
    readonly type = NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_TRY;
    constructor(public payload?: LogbookNBPDCLTieLineExchange) {}
}

export class UpdateNBPDCLTieLinesExchangeSuccessAction {
    readonly type = NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS;
    constructor(public payload?: LogbookNBPDCLTieLineExchange) {}
}

export class UpdateNBPDCLTieLinesExchangeErrorAction {
    readonly type = NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookNBPDCLTieLinesExchangeActionsUnion = GetNBPDCLTieLinesExchangeAction
| GetNBPDCLTieLinesExchangeSuccessAction | GetNBPDCLTieLinesExchangeErrorAction|AddNBPDCLTieLinesExchangeAction
| AddNBPDCLTieLinesExchangeSuccessAction | AddNBPDCLTieLinesExchangeErrorAction| UpdateNBPDCLTieLinesExchangeAction
| UpdateNBPDCLTieLinesExchangeSuccessAction | UpdateNBPDCLTieLinesExchangeErrorAction;
