import { IDesignation } from '../../shared/models/designation.model';

export enum DesignationRepositoryActions {
    GET_DESIGNATIONS_TRY = 'GET_DESIGNATIONS_TRY',
    GET_DESIGNATIONS_SUCCESS = 'GET_DESIGNATIONS_SUCCESS',
    GET_DESIGNATIONS_ERROR = 'GET_DESIGNATIONS_ERROR'
}
export class GetDesignationAction {
    readonly type = DesignationRepositoryActions.GET_DESIGNATIONS_TRY;
    constructor() { }
}
export class GetDesignationSuccessAction {
    readonly type = DesignationRepositoryActions.GET_DESIGNATIONS_SUCCESS;
    constructor(public payload?: IDesignation[]) { }
}
export class GetDesignationErrorAction {
    readonly type = DesignationRepositoryActions.GET_DESIGNATIONS_ERROR;
    constructor(public payload?: any) { }
}
export type DesignationRepositoryActionsUnion =
    GetDesignationAction
    | GetDesignationSuccessAction
    | GetDesignationErrorAction;
