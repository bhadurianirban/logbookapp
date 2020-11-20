import { IDutyRoaster, IDutyRoasterMonthDataViewModel } from '../../shared/models/duty-roaster.model';
export enum DutyRoasterActions {
    GET_ROASTER_CONFIG_TRY = 'GET_ROASTER_CONFIG_TRY',
    GET_ROASTER_CONFIG_SUCCESS = 'GET_ROASTER_CONFIG_SUCCESS',
    GET_ROASTER_CONFIG_ERROR = 'GET_ROASTER_CONFIG_ERROR',
    CREATE_ROASTER_CONFIG_TRY = 'CREATE_ROASTER_CONFIG_TRY',
    CREATE_ROASTER_CONFIG_SUCCESS = 'CREATE_ROASTER_CONFIG_SUCCESS',
    CREATE_ROASTER_CONFIG_ERROR = 'CREATE_ROASTER_CONFIG_ERROR',
    RPT_ROASTER_CONFIG_TRY = 'Rpt_ROASTER_CONFIG_TRY',
    RPT_ROASTER_CONFIG_SUCCESS = 'Rpt_ROASTER_CONFIG_SUCCESS',
    RPT_ROASTER_CONFIG_ERROR = 'Rpt_ROASTER_CONFIG_ERROR'
}
export class GetDutyRoasterConfigAction {
    readonly type = DutyRoasterActions.GET_ROASTER_CONFIG_TRY;
    constructor(public payload?: any) {}
}
export class GetDutyRoasterConfigSuccessAction {
    readonly type = DutyRoasterActions.GET_ROASTER_CONFIG_SUCCESS;
    constructor(public payload?: IDutyRoaster) {}
}
export class GetDutyRoasterConfigErrorAction {
    readonly type = DutyRoasterActions.GET_ROASTER_CONFIG_ERROR;
    constructor(public payload?: any) {}
}
export class CreateDutyRoasterConfigAction {
    readonly type = DutyRoasterActions.CREATE_ROASTER_CONFIG_TRY;
    constructor(public payload?: IDutyRoasterMonthDataViewModel) {}
}
export class CreateDutyRoasterConfigSuccessAction {
    readonly type = DutyRoasterActions.CREATE_ROASTER_CONFIG_SUCCESS;
    constructor(public payload?: IDutyRoaster) {}
}
export class CreateDutyRoasterConfigErrorAction {
    readonly type = DutyRoasterActions.CREATE_ROASTER_CONFIG_ERROR;
    constructor(public payload?: any) {}
}
export class RptDutyRoasterConfigAction {
    readonly type = DutyRoasterActions.RPT_ROASTER_CONFIG_TRY;
    constructor(public payload?: { month: string, isExcel: boolean }) {}
}
export class RptDutyRoasterConfigSuccessAction {
    readonly type = DutyRoasterActions.RPT_ROASTER_CONFIG_SUCCESS;
    constructor(public payload?: { data: any, isExcel: boolean, fileName: string}) {}
}
export class RptDutyRoasterConfigErrorAction {
    readonly type = DutyRoasterActions.RPT_ROASTER_CONFIG_ERROR;
    constructor(public payload?: any) {}
}

export type DutyRoasterActionUnion=
GetDutyRoasterConfigAction
| GetDutyRoasterConfigSuccessAction
| GetDutyRoasterConfigErrorAction
| CreateDutyRoasterConfigAction
| CreateDutyRoasterConfigSuccessAction
| CreateDutyRoasterConfigErrorAction
| RptDutyRoasterConfigAction
| RptDutyRoasterConfigSuccessAction
| RptDutyRoasterConfigErrorAction;
