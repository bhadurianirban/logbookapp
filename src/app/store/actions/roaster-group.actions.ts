import { IRoasterGroup } from '../../shared/models/roaster-group.model';

export enum RoasterGroupActions {
    GET_ROASTER_GROUP_TRY = 'GET_ROASTER_GROUP_TRY',
    GET_ROASTER_GROUP_SUCCESS = 'GET_ROASTER_GROUP_SUCCESS',
    GET_ROASTER_GROUP_ERROR = 'GET_ROASTER_GROUP_ERROR'
}
export class GetRoasterGroupAction {
    readonly type = RoasterGroupActions.GET_ROASTER_GROUP_TRY;
    constructor() {}
}
export class GetRoasterGroupSuccessAction {
    readonly type = RoasterGroupActions.GET_ROASTER_GROUP_SUCCESS;
    constructor(public payload?: IRoasterGroup[]) {}
}
export class GetRoasterGroupErrorAction {
    readonly type = RoasterGroupActions.GET_ROASTER_GROUP_ERROR;
    constructor(public payload?: any) {}
}
export type RoasterGroupActionUnion =
GetRoasterGroupAction
|GetRoasterGroupSuccessAction
|GetRoasterGroupErrorAction;




