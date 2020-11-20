import { IUserRoleMap, IUserRoleMapView } from '../../user-manage/user-role-map/user-role-map.model';

export enum UserRoleMapActions {
    GET_USERROLEMAPPING_TRY = 'GET_USERROLEMAPPING_TRY',
    GET_USERROLEMAPPING_SUCCESS = 'GET_USERROLEMAPPING_SUCCESS',
    GET_USERROLEMAPPING_ERROR = 'GET_USERROLEMAPPING_ERROR',

    CREATE_USERROLEMAPPING_TRY = 'CREATE_USERROLEMAPPING_TRY',
    CREATE_USERROLEMAPPING_SUCCESS = 'CREATE_USERROLEMAPPING_SUCCESS',
    CREATE_USERROLEMAPPING_ERROR = 'CREATE_USERROLEMAPPING_ERROR',

    DELETE_USERROLEMAPPING_TRY = 'DELETE_USERROLEMAPPING_TRY',
    DELETE_USERROLEMAPPING_SUCCESS = 'DELETE_USERROLEMAPPING_SUCCESS',
    DELETE_USERROLEMAPPING_ERROR = 'DELETE_USERROLEMAPPING_ERROR',
}
export class GetUserRoleMapAction {
    readonly type = UserRoleMapActions.GET_USERROLEMAPPING_TRY;
    constructor() { }
}
export class GetUserRoleMapSuccessAction {
    readonly type = UserRoleMapActions.GET_USERROLEMAPPING_SUCCESS;
    constructor(public payload?: IUserRoleMapView[]) { }
}
export class GetUserRoleMapErrorAction {
    readonly type = UserRoleMapActions.GET_USERROLEMAPPING_ERROR;
    constructor(public payload?: any) { }
}

export class CreateUserRoleMapAction {
    readonly type = UserRoleMapActions.CREATE_USERROLEMAPPING_TRY;
    constructor(public payload?: any) { }
}
export class CreateUserRoleMapSuccessAction {
    readonly type = UserRoleMapActions.CREATE_USERROLEMAPPING_SUCCESS;
    constructor(public payload?: IUserRoleMapView) { }
}
export class CreateUserRoleMapErrorAction {
    readonly type = UserRoleMapActions.CREATE_USERROLEMAPPING_ERROR;
    constructor(public payload?: any) { }
}

export class DeleteUserRoleMapAction {
    readonly type = UserRoleMapActions.DELETE_USERROLEMAPPING_TRY;
    constructor(public payload?: any) { }
}
export class DeleteUserRoleMapSuccessAction {
    readonly type = UserRoleMapActions.DELETE_USERROLEMAPPING_SUCCESS;
    constructor(public payload?: IUserRoleMapView) { }
}
export class DeleteUserRoleMapErrorAction {
    readonly type = UserRoleMapActions.DELETE_USERROLEMAPPING_ERROR;
    constructor(public payload?: any) { }
}
export type UserRoleMapActionUnion =
GetUserRoleMapAction
|GetUserRoleMapSuccessAction
|GetUserRoleMapErrorAction
|CreateUserRoleMapAction
|CreateUserRoleMapSuccessAction
|CreateUserRoleMapErrorAction
|DeleteUserRoleMapAction
|DeleteUserRoleMapSuccessAction
|DeleteUserRoleMapErrorAction;
