import { OutageModel } from 'src/app/shared/models/outage.model';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { AntiTheftModel } from 'src/app/shared/models/antiTheft.model';
import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';
import { AutoRecloseModel } from 'src/app/shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from 'src/app/shared/models/first-time-charge.model';

export enum HistoricElementActions {
    GET_OUTAGE_HISTORY_ELEMENTS_TRY = 'GET_OUTAGE_HISTORY_ELEMENTS_TRY',
    GET_OUTAGE_HISTORY_ELEMENTS_SUCCESS = 'GET_OUTAGE_HISTORY_ELEMENTS_SUCCESS',
    GET_OUTAGE_HISTORY_ELEMENTS_ERROR = 'GET_OUTAGE_HISTORY_ELEMENTS_ERROR',

    GET_AUTORECLOSE_HISTORY_ELEMENTS_TRY = 'GET_AUTORECLOSE_HISTORY_ELEMENTS_TRY',
    GET_AUTORECLOSE_HISTORY_ELEMENTS_SUCCESS = 'GET_AUTORECLOSE_HISTORY_ELEMENTS_SUCCESS',
    GET_AUTORECLOSE_HISTORY_ELEMENTS_ERROR = 'GET_AUTORECLOSE_HISTORY_ELEMENTS_ERROR',

    GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_TRY = 'GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_TRY',
    GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_SUCCESS = 'GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_SUCCESS',
    GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_ERROR = 'GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_ERROR',

    GET_SHUTDOWN_HISTORY_ELEMENTS_TRY = 'GET_SHUTDOWN_HISTORY_ELEMENTS_TRY',
    GET_SHUTDOWN_HISTORY_ELEMENTS_SUCCESS = 'GET_SHUTDOWN_HISTORY_ELEMENTS_SUCCESS',
    GET_SHUTDOWN_HISTORY_ELEMENTS_ERROR = 'GET_SHUTDOWN_HISTORY_ELEMENTS_ERROR',

    GET_TRIPPING_HISTORY_ELEMENTS_TRY = 'GET_TRIPPING_HISTORY_ELEMENTS_TRY',
    GET_TRIPPING_HISTORY_ELEMENTS_SUCCESS = 'GET_TRIPPING_HISTORY_ELEMENTS_SUCCESS',
    GET_TRIPPING_HISTORY_ELEMENTS_ERROR = 'GET_TRIPPING_HISTORY_ELEMENTS_ERROR',

    GET_ANTITHEFT_HISTORY_ELEMENTS_TRY = 'GET_ANTITHEFT_HISTORY_ELEMENTS_TRY',
    GET_ANTITHEFT_HISTORY_ELEMENTS_SUCCESS = 'GET_ANTITHEFT_HISTORY_ELEMENTS_SUCCESS',
    GET_ANTITHEFT_HISTORY_ELEMENTS_ERROR = 'GET_ANTITHEFT_HISTORY_ELEMENTS_ERROR',
}

export class GetOutageHistroyAction {
    readonly type = HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_TRY;
    constructor(public payload?: {fromDate: string, toDate: string}) {}
}

export class GetOutageHistorySuccessAction {
    readonly type = HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_SUCCESS;
    constructor(public payload?: OutageModel[]) {}
}

export class GetOutageHistoryErrorAction {
    readonly type = HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}

export class GetAutoRecloseHistroyAction {
    readonly type = HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_TRY;
    constructor(public payload?: {fromDate: string, toDate: string}) {}
}

export class GetAutoRecloseHistorySuccessAction {
    readonly type = HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_SUCCESS;
    constructor(public payload?: AutoRecloseModel[]) {}
}

export class GetAutoRecloseHistoryErrorAction {
    readonly type = HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}
export class GetFirstTimeChargeHistroyAction {
    readonly type = HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_TRY;
    constructor(public payload?: {fromDate: string, toDate: string}) {}
}

export class GetFirstTimeChargeHistorySuccessAction {
    readonly type = HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel[]) {}
}

export class GetFirstTimeChargeHistoryErrorAction {
    readonly type = HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}
export class GetTrippingHistroyAction {
    readonly type = HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_TRY;
    constructor(public payload?: {fromDate: string, toDate: string}) {}
}

export class GetTrippingHistorySuccessAction {
    readonly type = HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_SUCCESS;
    constructor(public payload?: TrippingModel[]) {}
}

export class GetTrippingHistoryErrorAction {
    readonly type = HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}

export class GetAntitheftHistroyAction {
    readonly type = HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_TRY;
    constructor(public payload?: {fromDate: string, toDate: string}) {}
}

export class GetAntitheftHistorySuccessAction {
    readonly type = HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_SUCCESS;
    constructor(public payload?: AntiTheftModel[]) {}
}

export class GetAntitheftHistoryErrorAction {
    readonly type = HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}

export class GetShutdownHistroyAction {
    readonly type = HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_TRY;
    constructor(public payload?: {fromDate: string, toDate: string}) {}
}

export class GetShutdownHistorySuccessAction {
    readonly type = HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest[]) {}
}

export class GetShutdownHistoryErrorAction {
    readonly type = HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}

export type HistoricElementActionsUnion = GetAntitheftHistroyAction | GetAntitheftHistorySuccessAction | GetAntitheftHistoryErrorAction
| GetOutageHistroyAction | GetOutageHistorySuccessAction | GetOutageHistoryErrorAction
| GetTrippingHistroyAction | GetTrippingHistorySuccessAction | GetTrippingHistoryErrorAction
| GetShutdownHistroyAction | GetShutdownHistorySuccessAction | GetShutdownHistoryErrorAction
| GetAutoRecloseHistroyAction | GetAutoRecloseHistorySuccessAction | GetAutoRecloseHistoryErrorAction
| GetFirstTimeChargeHistroyAction | GetFirstTimeChargeHistorySuccessAction | GetFirstTimeChargeHistoryErrorAction;
