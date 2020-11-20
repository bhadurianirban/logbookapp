import { Logbook } from 'src/app/shared/models/logbook.model';
import { OutageModel } from 'src/app/shared/models/outage.model';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { AntiTheftModel } from 'src/app/shared/models/antiTheft.model';
import { AutoRecloseModel } from 'src/app/shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from 'src/app/shared/models/first-time-charge.model';
import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';
import { Action } from '@ngrx/store';
import { LoadViewModel } from 'src/app/shared/models/load-management.model';

export enum LogBookActions {
    CREATE_LOGBOOK_TRY = 'CREATE_LOGBOOK_TRY',
    CREATE_LOGBOOK_SUCCESS = 'CREATE_LOGBOOK_SUCCESS',
    CREATE_LOGBOOK_ERROR = 'CREATE_LOGBOOK_ERROR',

    UPDATE_LOGBOOK_TRY = 'UPDATE_LOGBOOK_TRY',
    UPDATE_LOGBOOK_SUCCESS = 'UPDATE_LOGBOOK_SUCCESS',
    UPDATE_LOGBOOK_ERROR = 'UPDATE_LOGBOOK_ERROR',

    LOAD_LOGBOOK_DETAIL_TRY = 'LOAD_LOGBOOK_DETAIL_TRY',
    LOAD_LOGBOOK_DETAILS_SUCCESS = 'LOAD_LOGBOOK_DETAILS_SUCCESS',
    LOAD_LOGBOOK_DETAILS_ERROR = 'LOAD_LOGBOOK_DETAILS_ERROR',

    SUBMIT_LOGBOOK_TRY = 'SUBMIT_LOGBOOK_TRY',
    SUBMIT_LOGBOOK_SUCCESS = 'SUBMIT_LOGBOOK_SUCCESS',
    SUBMIT_LOGBOOK_ERROR = 'SUBMIT_LOGBOOK_ERROR',

    GET_LOGBOOK_OUTAGE_TRY = 'GET_LOGBOOK_OUTAGE_TRY',
    GET_LOGBOOK_OUTAGE_SUCCESS = 'GET_LOGBOOK_OUTAGE_SUCCESS',
    GET_LOGBOOK_OUTAGE_ERROR = 'GET_LOGBOOK_OUTAGE_ERROR',

    GET_LOGBOOK_TRIPPING_TRY = 'GET_LOGBOOK_TRIPPING_TRY',
    GET_LOGBOOK_TRIPPING_SUCCESS = 'GET_LOGBOOK_TRIPPING_SUCCESS',
    GET_LOGBOOK_TRIPPING_ERROR = 'GET_LOGBOOK_TRIPPING_ERROR',

    GET_LOGBOOK_ANTITHEFT_TRY = 'GET_LOGBOOK_ANTITHEFT_TRY',
    GET_LOGBOOK_ANTITHEFT_SUCCESS = 'GET_LOGBOOK_ANTITHEFT_SUCCESS',
    GET_LOGBOOK_ANTITHEFT_ERROR = 'GET_LOGBOOK_ANTITHEFT_ERROR',

    GET_LOGBOOK_AUTORECLOSE_TRY = 'GET_LOGBOOK_AUTORECLOSE_TRY',
    GET_LOGBOOK_AUTORECLOSE_SUCCESS = 'GET_LOGBOOK_AUTORECLOSE_SUCCESS',
    GET_LOGBOOK_AUTORECLOSE_ERROR = 'GET_LOGBOOK_AUTORECLOSE_ERROR',

    GET_LOGBOOK_FIRSTTIMECHARGE_TRY = 'GET_LOGBOOK_FIRSTTIMECHARGE_TRY',
    GET_LOGBOOK_FIRSTTIMECHARGE_SUCCESS = 'GET_LOGBOOK_FIRSTTIMECHARGE_SUCCESS',
    GET_LOGBOOK_FIRSTTIMECHARGE_ERROR = 'GET_LOGBOOK_FIRSTTIMECHARGE_ERROR',

    GET_LOGBOOK_SHUTDOWN_TRY = 'GET_LOGBOOK_SHUTDOWN_TRY',
    GET_LOGBOOK_SHUTDOWN_SUCCESS = 'GET_LOGBOOK_SHUTDOWN_SUCCESS',
    GET_LOGBOOK_SHUTDOWN_ERROR = 'GET_LOGBOOK_SHUTDOWN_ERROR',

    GET_LOGBOOK_LOAD_DATA_TRY = 'GET_LOGBOOK_LOAD_DATA_TRY',
    GET_LOGBOOK_LOAD_DATA_SUCCESS = 'GET_LOGBOOK_LOAD_DATA_SUCCESS',
    GET_LOGBOOK_LOAD_DATA_ERROR = 'GET_LOGBOOK_LOAD_DATA_ERROR',

    GET_LOGBOOK_RESTRICTION_TRY = 'GET_LOGBOOK_RESTRICTION_TRY',
    GET_LOGBOOK_RESTRICTION_SUCCESS = 'GET_LOGBOOK_RESTRICTION_SUCCESS',
    GET_LOGBOOK_RESTRICTION_ERROR = 'GET_LOGBOOK_RESTRICTION_ERROR',

    GET_LOGBOOK_RELEASE_TRY = 'GET_LOGBOOK_RELEASE_TRY',
    GET_LOGBOOK_RELEASE_SUCCESS = 'GET_LOGBOOK_RELEASE_SUCCESS',
    GET_LOGBOOK_RELEASE_ERROR = 'GET_LOGBOOK_RELEASE_ERROR',

    CLEAR_LOGBOOK_TRY = 'CLEAR_LOGBOOK_TRY',
}

export class CreateLogbookAction {
    readonly type = LogBookActions.CREATE_LOGBOOK_TRY;
    constructor(public payload?: Logbook) {}
}

export class CreateLogbookSuccessAction {
    readonly type = LogBookActions.CREATE_LOGBOOK_SUCCESS;
    constructor(public payload?: Logbook) {}
}

export class CreateLogbookErrorAction {
    readonly type = LogBookActions.CREATE_LOGBOOK_ERROR;
    constructor(public payload?: any) {}
}

export class LoadLogbookDetailsAction {
    readonly type = LogBookActions.LOAD_LOGBOOK_DETAIL_TRY;
    constructor(public payload?: string) {}
}

export class LoadLogbookDetailsSuccessAction {
    readonly type = LogBookActions.LOAD_LOGBOOK_DETAILS_SUCCESS;
    constructor(public payload?: Logbook) {}
}

export class LoadLogbookDetailsErrorAction {
    readonly type = LogBookActions.LOAD_LOGBOOK_DETAILS_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateLogbookAction {
    readonly type = LogBookActions.UPDATE_LOGBOOK_TRY;
    constructor(public payload?: Logbook) {}
}

export class UpdateLogbookSuccessAction {
    readonly type = LogBookActions.UPDATE_LOGBOOK_SUCCESS;
    constructor(public payload?: Logbook) {}
}

export class UpdateLogbookErrorAction {
    readonly type = LogBookActions.UPDATE_LOGBOOK_ERROR;
    constructor(public payload?: any) {}
}

export class SubmitLogbookAction {
    readonly type = LogBookActions.SUBMIT_LOGBOOK_TRY;
    constructor(public payload?: string) {}
}

export class SubmitLogbookSuccessAction {
    readonly type = LogBookActions.SUBMIT_LOGBOOK_SUCCESS;
    constructor(public payload?: boolean) {}
}

export class SubmitLogbookErrorAction {
    readonly type = LogBookActions.SUBMIT_LOGBOOK_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookOutageAction {
    readonly type = LogBookActions.GET_LOGBOOK_OUTAGE_TRY;
    constructor(public payload?: { logbookId: string, type: number }) {}
}

export class GetLogbookOutageSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel[]) {}
}

export class GetLogbookOutageErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_OUTAGE_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookTrippingAction {
    readonly type = LogBookActions.GET_LOGBOOK_TRIPPING_TRY;
    constructor(public payload?: { logbookId: string, type: number }) {}
}

export class GetLogbookTrippingSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel[]) {}
}

export class GetLogbookTrippingErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_TRIPPING_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookAntiTheftAction {
    readonly type = LogBookActions.GET_LOGBOOK_ANTITHEFT_TRY;
    constructor(public payload?: { logbookId: string, type: number }) {}
}

export class GetLogbookAntiTheftSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel[]) {}
}

export class GetLogbookAntiTheftErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_ANTITHEFT_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookAutoRecloseAction {
    readonly type = LogBookActions.GET_LOGBOOK_AUTORECLOSE_TRY;
    constructor(public payload?: { logbookId: string, type: number }) {}
}

export class GetLogbookAutoRecloseSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_AUTORECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel[]) {}
}

export class GetLogbookAutoRecloseErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_AUTORECLOSE_ERROR;
    constructor(public payload?: any) {}
}
export class GetLogbookFirstTimeChargeAction {
    readonly type = LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_TRY;
    constructor(public payload?: { logbookId: string, type: number }) {}
}

export class GetLogbookFirstTimeChargeSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel[]) {}
}

export class GetLogbookFirstTimeChargeErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_ERROR;
    constructor(public payload?: any) {}
}
export class GetLogbookShutdownAction {
    readonly type = LogBookActions.GET_LOGBOOK_SHUTDOWN_TRY;
    constructor(public payload?: { logbookId: string, type: number }) {}
}

export class GetLogbookShutdownSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest[]) {}
}

export class GetLogbookShutdownErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_SHUTDOWN_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookRestrictionAction {
    readonly type = LogBookActions.GET_LOGBOOK_RESTRICTION_TRY;
    constructor(public payload?: string) {}
}

export class GetLogbookRestrictionSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_RESTRICTION_SUCCESS;
    constructor(public payload?: LoadViewModel[]) {}
}

export class GetLogbookRestrictionErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_RESTRICTION_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookReleaseAction {
    readonly type = LogBookActions.GET_LOGBOOK_RELEASE_TRY;
    constructor(public payload?: string) {}
}

export class GetLogbookReleaseSuccessAction {
    readonly type = LogBookActions.GET_LOGBOOK_RELEASE_SUCCESS;
    constructor(public payload?: LoadViewModel[]) {}
}

export class GetLogbookReleaseErrorAction {
    readonly type = LogBookActions.GET_LOGBOOK_RELEASE_ERROR;
    constructor(public payload?: any) {}
}

export class ClearLogbookAction implements Action {
    readonly type = LogBookActions.CLEAR_LOGBOOK_TRY;
    constructor() {}
}

export type LogbookActionsUnion = CreateLogbookAction | CreateLogbookSuccessAction | CreateLogbookErrorAction
      |  LoadLogbookDetailsAction | LoadLogbookDetailsSuccessAction | LoadLogbookDetailsErrorAction
      | UpdateLogbookAction | UpdateLogbookSuccessAction | UpdateLogbookErrorAction
      | SubmitLogbookAction | SubmitLogbookSuccessAction | SubmitLogbookErrorAction
      | GetLogbookAntiTheftAction | GetLogbookAntiTheftErrorAction | GetLogbookAntiTheftSuccessAction
      | GetLogbookAutoRecloseAction | GetLogbookAutoRecloseErrorAction | GetLogbookAutoRecloseSuccessAction
      | GetLogbookFirstTimeChargeAction | GetLogbookFirstTimeChargeErrorAction | GetLogbookFirstTimeChargeSuccessAction
      | GetLogbookOutageAction | GetLogbookOutageErrorAction | GetLogbookOutageSuccessAction
      | GetLogbookTrippingAction | GetLogbookTrippingErrorAction | GetLogbookTrippingSuccessAction
      | GetLogbookShutdownAction | GetLogbookShutdownErrorAction | GetLogbookShutdownSuccessAction
      | ClearLogbookAction
      | GetLogbookRestrictionAction | GetLogbookRestrictionSuccessAction | GetLogbookRestrictionErrorAction
      | GetLogbookReleaseAction | GetLogbookReleaseSuccessAction | GetLogbookReleaseErrorAction;
