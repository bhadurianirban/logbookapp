import { MasterData, IOutageSelectOptions, MasterElementsData } from 'src/app/shared/models/master-data.model';

export enum MasterElementsActions {
    GET_MASTER_ELEMENTS_TRY = 'GET_MASTER_ELEMENTS_TRY',
    GET_MASTER_ELEMENTS_SUCCESS = 'GET_MASTER_ELEMENTS_SUCCESS',
    GET_MASTER_ELEMENTS_ERROR = 'GET_MASTER_ELEMENTS_ERROR',
    GET_REASON_REMARKS_OPTIONS_TRY = 'GET_REASON_REMARKS_OPTIONS_TRY',
    GET_REASON_REMARKS_OPTIONS_SUCCESS = 'GET_REASON_REMARKS_OPTIONS_SUCCESS',
    GET_REASON_REMARKS_OPTIONS_ERROR = 'GET_REASON_REMARKS_OPTIONS_ERROR',
    GET_COMMON_MASTER_DATA_TRY = 'GET_COMMON_MASTER_DATA_TRY',
    GET_COMMON_MASTER_DATA_SUCCESS = 'GET_COMMON_MASTER_DATA_SUCCESS',
    GET_COMMON_MASTER_DATA_ERROR = 'GET_COMMON_MASTER_DATA_ERROR'
}

export class GetMasterElementsAction {
    readonly type = MasterElementsActions.GET_MASTER_ELEMENTS_TRY;
    constructor(public payload?: any) {}
}

export class GetMasterElementsSuccessAction {
    readonly type = MasterElementsActions.GET_MASTER_ELEMENTS_SUCCESS;
    constructor(public payload?: MasterElementsData) {}
}

export class GetMasterElementsErrorAction {
    readonly type = MasterElementsActions.GET_MASTER_ELEMENTS_ERROR;
    constructor(public payload?: any) {}
}

export class GetCommonMasterDataAction {
    readonly type = MasterElementsActions.GET_COMMON_MASTER_DATA_TRY;
    constructor(public payload?: any) {}
}

export class GetCommonMasterDataSuccessAction {
    readonly type = MasterElementsActions.GET_COMMON_MASTER_DATA_SUCCESS;
    constructor(public payload?: MasterData) {}
}

export class GetCommonMasterDataErrorAction {
    readonly type = MasterElementsActions.GET_COMMON_MASTER_DATA_ERROR;
    constructor(public payload?: any) {}
}

export class GetReasonRemarksOptionsAction {
    readonly type = MasterElementsActions.GET_REASON_REMARKS_OPTIONS_TRY;
    constructor() {}
}

export class GetReasonRemarksOptionsSuccessAction {
    readonly type = MasterElementsActions.GET_REASON_REMARKS_OPTIONS_SUCCESS;
    constructor(public payload?: IOutageSelectOptions) {}
}

export class GetReasonRemarksOptionsErrorAction {
    readonly type = MasterElementsActions.GET_REASON_REMARKS_OPTIONS_ERROR;
    constructor(public payload?: any) {}
}

export type MasterElementsActionsUnion = GetMasterElementsAction | GetMasterElementsSuccessAction
 | GetMasterElementsErrorAction | GetReasonRemarksOptionsAction
 | GetReasonRemarksOptionsSuccessAction | GetReasonRemarksOptionsErrorAction
 | GetCommonMasterDataAction | GetCommonMasterDataSuccessAction | GetCommonMasterDataErrorAction;
