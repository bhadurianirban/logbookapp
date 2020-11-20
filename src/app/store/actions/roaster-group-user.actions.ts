import { IRoasterGroupUser, IRoasterGroupUserViewModel, IRoasterGroupUserCombination } from '../../shared/models/roaster-group-user.model';

export enum RoasterGroupUserActions {
    GET_ROASTER_GROUP_USER_TRY = 'GET_ROASTER_GROUP_USER_TRY',
    GET_ROASTER_GROUP_USER_SUCCESS = 'GET_ROASTER_GROUP_USER_SUCCESS',
    GET_ROASTER_GROUP_USER_ERROR = 'GET_ROASTER_GROUP_USER_ERROR',

    CREATE_ROASTER_GROUP_USER_TRY = 'CREATE_ROASTER_GROUP_USER_TRY',
    CREATE_ROASTER_GROUP_USER_SUCCESS = 'CREATE_ROASTER_GROUP_USER_SUCCESS',
    CREATE_ROASTER_GROUP_USER_ERROR = 'CREATE_ROASTER_GROUP_USER_ERROR',

    DELETE_ROASTER_GROUP_USER_TRY = 'DELETE_ROASTER_GROUP_USER_TRY',
    DELETE_ROASTER_GROUP_USER_SUCCESS = 'DELETE_ROASTER_GROUP_USER_SUCCESS',
    DELETE_ROASTER_GROUP_USER_ERROR = 'DELETE_ROASTER_GROUP_USER_ERROR'
}
export class GetRoasterGroupUserAction {
    readonly type = RoasterGroupUserActions.GET_ROASTER_GROUP_USER_TRY;
    constructor(public payload?: any) {}
}
export class GetRoasterGroupUserSuccessAction {
    readonly type = RoasterGroupUserActions.GET_ROASTER_GROUP_USER_SUCCESS;
    constructor(public payload?: IRoasterGroupUserViewModel[]) {}
}
export class GetRoasterGroupUserErrorAction {
    readonly type = RoasterGroupUserActions.GET_ROASTER_GROUP_USER_ERROR;
    constructor(public payload?: any) {}
}

export class CreateRoasterGroupUserAction {
    readonly type = RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_TRY;
    constructor(public payload?: IRoasterGroupUserCombination) {}
}
export class CreateRoasterGroupUserSuccessAction {
    readonly type = RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_SUCCESS;
    constructor(public payload?: IRoasterGroupUserCombination) {}
}
export class CreateRoasterGroupUserErrorAction {
    readonly type = RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteRoasterGroupUserAction {
    readonly type = RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_TRY;
    constructor(public payload?: IRoasterGroupUser) {}
}
export class DeleteRoasterGroupUserSuccessAction {
    readonly type = RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_SUCCESS;
    constructor(public payload?: IRoasterGroupUserCombination) {}
}
export class DeleteRoasterGroupUserErrorAction {
    readonly type = RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_ERROR;
    constructor(public payload?: any) {}
}

export type RoasterGroupUserActionUnion =
GetRoasterGroupUserAction
|GetRoasterGroupUserSuccessAction
|GetRoasterGroupUserErrorAction
|CreateRoasterGroupUserAction
|CreateRoasterGroupUserSuccessAction
|CreateRoasterGroupUserErrorAction
|DeleteRoasterGroupUserAction
|DeleteRoasterGroupUserSuccessAction
|DeleteRoasterGroupUserErrorAction;




