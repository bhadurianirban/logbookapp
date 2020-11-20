import { IRole } from '../../shared/models/role.model';

export enum RoleRepositoryActions {
    GET_ROLES_TRY = 'GET_ROLES_TRY',
    GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS',
    GET_ROLES_ERROR = 'GET_ROLES_ERROR',
}
export class GetRoleAction {
    readonly type = RoleRepositoryActions.GET_ROLES_TRY;
    constructor() { }
}
export class GetRoleSuccessAction {
    readonly type = RoleRepositoryActions.GET_ROLES_SUCCESS;
    constructor(public payload?: IRole[]) { }
}
export class GetRoleErrorAction {
    readonly type = RoleRepositoryActions.GET_ROLES_ERROR;
    constructor(public payload?: any) { }
}
export type RoleRepositoryActionUnion =
GetRoleAction
|GetRoleSuccessAction
|GetRoleErrorAction;