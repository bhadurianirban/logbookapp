import { LogbookSBPDCLTieLineExchange } from 'src/app/e-logbook/models/SBPDCLTieLineExchange.model';

export enum SBPDCLTieLinesExchangeActions {
    GET_SBPDCL_TIE_LINES_EXCHANGE_TRY = 'GET_SBPDCL_TIE_LINES_EXCHANGE_TRY',
    GET_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS = 'GET_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS',
    GET_SBPDCL_TIE_LINES_EXCHANGE_ERROR = 'GET_SBPDCL_TIE_LINES_EXCHANGE_ERROR',
    ADD_SBPDCL_TIE_LINES_EXCHANGE_TRY = 'ADD_SBPDCL_TIE_LINES_EXCHANGE_TRY',
    ADD_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS = 'ADD_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS',
    ADD_SBPDCL_TIE_LINES_EXCHANGE_ERROR = 'ADD_SBPDCL_TIE_LINES_EXCHANGE_ERROR',
    UPDATE_SBPDCL_TIE_LINES_EXCHANGE_TRY = 'UPDATE_SBPDCL_TIE_LINES_EXCHANGE_TRY',
    UPDATE_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS = 'UPDATE_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS',
    UPDATE_SBPDCL_TIE_LINES_EXCHANGE_ERROR = 'UPDATE_SBPDCL_TIE_LINES_EXCHANGE_ERROR',
}
export class GetSBPDCLTieLinesExchangeAction {
    readonly type = SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_TRY;
    constructor(public payload?: string) {}
}

export class GetSBPDCLTieLinesExchangeSuccessAction {
    readonly type = SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS;
    constructor(public payload?: LogbookSBPDCLTieLineExchange) {}
}

export class GetSBPDCLTieLinesExchangeErrorAction {
    readonly type = SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_ERROR;
    constructor(public payload?: any) {}
}
export class AddSBPDCLTieLinesExchangeAction {
    readonly type = SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_TRY;
    constructor(public payload?: LogbookSBPDCLTieLineExchange) {}
}

export class AddSBPDCLTieLinesExchangeSuccessAction {
    readonly type = SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS;
    constructor(public payload?: LogbookSBPDCLTieLineExchange) {}
}

export class AddSBPDCLTieLinesExchangeErrorAction {
    readonly type = SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateSBPDCLTieLinesExchangeAction {
    readonly type = SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_TRY;
    constructor(public payload?: LogbookSBPDCLTieLineExchange) {}
}

export class UpdateSBPDCLTieLinesExchangeSuccessAction {
    readonly type = SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS;
    constructor(public payload?: LogbookSBPDCLTieLineExchange) {}
}

export class UpdateSBPDCLTieLinesExchangeErrorAction {
    readonly type = SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_ERROR;
    constructor(public payload?: any) {}
}
export type LogbookSBPDCLTieLinesExchangeActionsUnion = GetSBPDCLTieLinesExchangeAction
| GetSBPDCLTieLinesExchangeSuccessAction | GetSBPDCLTieLinesExchangeErrorAction|AddSBPDCLTieLinesExchangeAction
| AddSBPDCLTieLinesExchangeSuccessAction | AddSBPDCLTieLinesExchangeErrorAction|UpdateSBPDCLTieLinesExchangeAction
| UpdateSBPDCLTieLinesExchangeSuccessAction | UpdateSBPDCLTieLinesExchangeErrorAction;
