import { IDashboard } from 'src/app/shared/models/dashboard-model';
import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';
import { OutageModel } from 'src/app/shared/models/outage.model';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { AntiTheftModel } from 'src/app/shared/models/antiTheft.model';
import { AutoRecloseModel } from 'src/app/shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from 'src/app/shared/models/first-time-charge.model';


export enum DashboardActions {
    GET_DASHBOARD_DATA_TRY = 'GET_DASHBOARD_DATA_TRY',
    GET_DASHBOARD_DATA_SUCCESS = 'GET_DASHBOARD_DATA_SUCCESS',
    GET_DASHBOARD_DATA_ERROR = 'GET_DASHBOARD_DATA_ERROR',

    GET_DASHBOARD_SHUTDOWN_TRY = 'GET_DASHBOARD_SHUTDOWN_TRY',
    GET_DASHBOARD_SHUTDOWN_SUCCESS = 'GET_DASHBOARD_SHUTDOWN_SUCCESS',
    GET_DASHBOARD_SHUTDOWN_ERROR = 'GET_DASHBOARD_SHUTDOWN_ERROR',

    GET_DASHBOARD_OUTAGE_TRY = 'GET_DASHBOARD_OUTAGE_TRY',
    GET_DASHBOARD_OUTAGE_SUCCESS = 'GET_DASHBOARD_OUTAGE_SUCCESS',
    GET_DASHBOARD_OUTAGE_ERROR = 'GET_DASHBOARD_OUTAGE_ERROR',

    GET_DASHBOARD_AUTO_RECLOSE_TRY = 'GET_DASHBOARD_AUTO_RECLOSE_TRY',
    GET_DASHBOARD_AUTO_RECLOSE_SUCCESS = 'GET_DASHBOARD_AUTO_RECLOSE_SUCCESS',
    GET_DASHBOARD_AUTO_RECLOSE_ERROR = 'GET_DASHBOARD_AUTO_RECLOSE_ERROR',

    GET_DASHBOARD_FIRST_TIME_CHARGE_TRY = 'GET_DASHBOARD_FIRST_TIME_CHARGE_TRY',
    GET_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS = 'GET_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS',
    GET_DASHBOARD_FIRST_TIME_CHARGE_ERROR = 'GET_DASHBOARD_FIRST_TIME_CHARGE_ERROR',

    GET_DASHBOARD_TRIPPING_TRY = 'GET_DASHBOARD_TRIPPING_TRY',
    GET_DASHBOARD_TRIPPING_SUCCESS = 'GET_DASHBOARD_TRIPPING_SUCCESS',
    GET_DASHBOARD_TRIPPING_ERROR = 'GET_DASHBOARD_TRIPPING_ERROR',

    GET_DASHBOARD_ANTITHEFT_TRY = 'GET_DASHBOARD_ANTITHEFT_TRY',
    GET_DASHBOARD_ANTITHEFT_SUCCESS = 'GET_DASHBOARD_ANTITHEFT_SUCCESS',
    GET_DASHBOARD_ANTITHEFT_ERROR = 'GET_DASHBOARD_ANTITHEFT_ERROR',

}

export class GetDashboardDataAction {
    readonly type = DashboardActions.GET_DASHBOARD_DATA_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardDataSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_DATA_SUCCESS;
    constructor(public payload?: IDashboard) {}
}

export class GetDashboardDataErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_DATA_ERROR;
    constructor(public payload?: any) {}
}

export class GetDashboardShutdownAction {
    readonly type = DashboardActions.GET_DASHBOARD_SHUTDOWN_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardShutdownSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest[]) {}
}

export class GetDashboardShutdownErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_SHUTDOWN_ERROR;
    constructor(public payload?: any) {}
}

export class GetDashboardOutageAction {
    readonly type = DashboardActions.GET_DASHBOARD_OUTAGE_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardOutageSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_OUTAGE_SUCCESS;
    constructor(public payload?: OutageModel[]) {}
}

export class GetDashboardOutageErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_OUTAGE_ERROR;
    constructor(public payload?: any) {}
}

export class GetDashboardAutoRecloseAction {
    readonly type = DashboardActions.GET_DASHBOARD_AUTO_RECLOSE_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardAutoRecloseSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_AUTO_RECLOSE_SUCCESS;
    constructor(public payload?: AutoRecloseModel[]) {}
}

export class GetDashboardAutoRecloseErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_AUTO_RECLOSE_ERROR;
    constructor(public payload?: any) {}
}

export class GetDashboardFirstTimeChargeAction {
    readonly type = DashboardActions.GET_DASHBOARD_FIRST_TIME_CHARGE_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardFirstTimeChargeSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS;
    constructor(public payload?: FirstTimeChargeModel[]) {}
}

export class GetDashboardFirstTimeChargeErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_FIRST_TIME_CHARGE_ERROR;
    constructor(public payload?: any) {}
}

export class GetDashboardTrippingAction {
    readonly type = DashboardActions.GET_DASHBOARD_TRIPPING_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardTrippingSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_TRIPPING_SUCCESS;
    constructor(public payload?: TrippingModel[]) {}
}

export class GetDashboardTrippingErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_TRIPPING_ERROR;
    constructor(public payload?: any) {}
}

export class GetDashboardAntitheftAction {
    readonly type = DashboardActions.GET_DASHBOARD_ANTITHEFT_TRY;
    constructor(public payload?: any) {}
}

export class GetDashboardAntitheftSuccessAction {
    readonly type = DashboardActions.GET_DASHBOARD_ANTITHEFT_SUCCESS;
    constructor(public payload?: AntiTheftModel[]) {}
}

export class GetDashboardAntitheftErrorAction {
    readonly type = DashboardActions.GET_DASHBOARD_ANTITHEFT_ERROR;
    constructor(public payload?: any) {}
}

export type DashboardActionsUnion = GetDashboardDataAction | GetDashboardDataSuccessAction
 | GetDashboardDataErrorAction | GetDashboardShutdownAction | GetDashboardShutdownSuccessAction
 | GetDashboardShutdownErrorAction | GetDashboardAntitheftAction | GetDashboardAntitheftSuccessAction
 | GetDashboardAntitheftErrorAction | GetDashboardOutageErrorAction | GetDashboardOutageAction
 | GetDashboardOutageSuccessAction | GetDashboardTrippingAction | GetDashboardTrippingErrorAction
 | GetDashboardTrippingSuccessAction | GetDashboardAutoRecloseAction | GetDashboardAutoRecloseSuccessAction
 | GetDashboardAutoRecloseErrorAction | GetDashboardFirstTimeChargeAction | GetDashboardFirstTimeChargeSuccessAction| GetDashboardFirstTimeChargeErrorAction;
