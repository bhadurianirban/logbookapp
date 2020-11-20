import { IALDCLoadModel, LoadConstituent } from 'src/app/shared/models/load-management.model';

export enum ALDCLoadActions {
    GET_ALDC_LOAD_TRY = 'GET_ALDC_LOAD_TRY',
    GET_ALDC_LOAD_SUCCESS = 'GET_ALDC_LOAD_SUCCESS',
    GET_ALDC_LOAD_ERROR = 'GET_ALDC_LOAD_ERROR',

    UPDATE_ALDC_LOAD_TRY = 'UPDATE_ALDC_LOAD_TRY',
    UPDATE_ALDC_LOAD_SUCCESS = 'UPDATE_ALDC_LOAD_SUCCESS',
    UPDATE_ALDC_LOAD_ERROR = 'UPDATE_ALDC_LOAD_ERROR',

    GET_ALDC_GRID_TRY = 'GET_ALDC_GRID_TRY',
    GET_ALDC_GRID_SUCCESS = 'GET_ALDC_GRID_SUCCESS',
    GET_ALDC_GRID_ERROR = 'GET_ALDC_GRID_ERROR',

    GET_ALDC_GRID_RESTRICTIONS_TRY = 'GET_ALDC_GRID_RESTRICTIONS_TRY',
    GET_ALDC_GRID_RESTRICTIONS_SUCCESS = 'GET_ALDC_GRID_RESTRICTIONS_SUCCESS',
    GET_ALDC_GRID_RESTRICTIONS_ERROR = 'GET_ALDC_GRID_RESTRICTIONS_ERROR'
}

export class GetALDCLoadAction {
    readonly type = ALDCLoadActions.GET_ALDC_LOAD_TRY;
    constructor(public payload?: string) {}
}

export class GetALDCLoadSuccessAction {
    readonly type = ALDCLoadActions.GET_ALDC_LOAD_SUCCESS;
    constructor(public payload?: IALDCLoadModel) {}
}

export class GetALDCLoadErrorAction {
    readonly type = ALDCLoadActions.GET_ALDC_LOAD_ERROR;
    constructor(public payload?: any) { }
}

export class UpdateALDCLoadAction {
    readonly type = ALDCLoadActions.UPDATE_ALDC_LOAD_TRY;
    constructor(public payload?: IALDCLoadModel) {}
}

export class UpdateALDCLoadSuccessAction {
    readonly type = ALDCLoadActions.UPDATE_ALDC_LOAD_SUCCESS;
    constructor(public payload?: IALDCLoadModel) {}
}

export class UpdateALDCLoadErrorAction {
    readonly type = ALDCLoadActions.UPDATE_ALDC_LOAD_ERROR;
    constructor(public payload?: any) {}
}

export class GetALDCGridAction {
    readonly type = ALDCLoadActions.GET_ALDC_GRID_TRY;
    constructor(public payload?: string) {}
}

export class GetALDCGridSuccessAction {
    readonly type = ALDCLoadActions.GET_ALDC_GRID_SUCCESS;
    constructor(public payload?: LoadConstituent[]) {}
}

export class GetALDCGridErrorAction {
    readonly type = ALDCLoadActions.GET_ALDC_GRID_ERROR;
    constructor(public payload?: any) { }
}

export class GetALDCGridRestrictionsAction {
    readonly type = ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_TRY;
    constructor(public payload?: string) {}
}

export class GetALDCGridRestrictionsuccessAction {
    readonly type = ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_SUCCESS;
    constructor(public payload?: LoadConstituent[]) {}
}

export class GetALDCGridRestrictionsErrorAction {
    readonly type = ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_ERROR;
    constructor(public payload?: any) { }
}

export type ALDCLoadActionsUnion = GetALDCLoadAction | GetALDCLoadSuccessAction | GetALDCLoadErrorAction |
UpdateALDCLoadAction | UpdateALDCLoadSuccessAction | UpdateALDCLoadErrorAction
| GetALDCGridAction | GetALDCGridSuccessAction | GetALDCGridErrorAction
| GetALDCGridRestrictionsAction | GetALDCGridRestrictionsuccessAction | GetALDCGridRestrictionsErrorAction;
