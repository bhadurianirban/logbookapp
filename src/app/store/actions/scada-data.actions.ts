import { IScadaData } from 'src/app/shared/models/scada-data.model';

export enum SCADADataActions {
    GET_STATE_WISE_DEVIATION_TRY = 'GET_STATE_WISE_DEVIATION_TRY',
    GET_STATE_WISE_DEVIATION_SUCCESS = 'GET_STATE_WISE_DEVIATION_SUCCESS',
    GET_STATE_WISE_DEVIATION_ERROR = 'GET_STATE_WISE_DEVIATION_ERROR'
}

export class GetStateWiseDeviationAction {
    readonly type = SCADADataActions.GET_STATE_WISE_DEVIATION_TRY;
    constructor(public payload?: string) {}
}

export class GetStateWiseDeviationSuccessAction {
    readonly type = SCADADataActions.GET_STATE_WISE_DEVIATION_SUCCESS;
    constructor(public payload?: IScadaData) {}
}

export class GetStateWiseDeviationErrorAction {
    readonly type = SCADADataActions.GET_STATE_WISE_DEVIATION_ERROR;
    constructor(public payload?: any) {}
}

export type SCADADataActionsUnion = GetStateWiseDeviationAction | GetStateWiseDeviationSuccessAction | GetStateWiseDeviationErrorAction;
