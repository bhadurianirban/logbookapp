export enum EnergyReportsAction {
    GET_ENERGY_REPORT_TRY = 'GET_ENERGY_REPORT_TRY',
    GET_ENERGY_REPORT_SUCCESS = 'GET_ENERGY_REPORT_SUCCESS',
    GET_ENERGY_REPORT_ERROR = 'GET_ENERGY_REPORT_ERROR'
}

export class GetEnergyReportAction {
    readonly type = EnergyReportsAction.GET_ENERGY_REPORT_TRY;
    constructor(public payload?: { logbookId: string}) {}
}

export class GetEnergyReportSuccessAction {
    readonly type = EnergyReportsAction.GET_ENERGY_REPORT_SUCCESS;
    constructor(public payload?: { data: any, isExcel: boolean, fileName: string}) {}
}

export class GetEnergyReportErrorAction {
    readonly type = EnergyReportsAction.GET_ENERGY_REPORT_ERROR;
    constructor(public payload?: any) {}
}



export type EnergyReportActionsUnion = GetEnergyReportAction | GetEnergyReportSuccessAction | GetEnergyReportErrorAction;
