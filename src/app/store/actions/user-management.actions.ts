import { IUserViewModelInterface, IUserInterface } from '../../shared/models/user-management.model';

export enum UserManagementRepositoryActions {
    GET_USERS_TRY = 'GET_USERS_TRY',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_ERROR = 'GET_USERS_ERROR',
    CREATE_USERS_TRY = 'CREATE_USERS_TRY',
    CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS',
    CREATE_USERS_ERROR = 'CREATE_USERS_ERROR',
    DELETE_USERS_TRY = 'DELETE_USERS_TRY',
    DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS',
    DELETE_USERS_ERROR = 'DELETE_USERS_ERROR'
}
export class GetUserAction {
    readonly type = UserManagementRepositoryActions.GET_USERS_TRY;
    constructor() { }
}
export class GetUserSuccessAction {
    readonly type = UserManagementRepositoryActions.GET_USERS_SUCCESS;
    constructor(public payload?: IUserViewModelInterface[]) { }
}
export class GetUserErrorAction {
    readonly type = UserManagementRepositoryActions.GET_USERS_ERROR;
    constructor(public payload?: any) { }
}
export class CreateUserAction {
    readonly type = UserManagementRepositoryActions.CREATE_USERS_TRY;
    constructor(public payload?: IUserInterface) { }
}
export class CreateUserSuccessAction {
    readonly type = UserManagementRepositoryActions.CREATE_USERS_SUCCESS;
    constructor(public payload?: IUserViewModelInterface) { }
}
export class CreateUserErrorAction {
    readonly type = UserManagementRepositoryActions.CREATE_USERS_ERROR;
    constructor(public payload?: any) { }
}

export class DeleteUserAction {
    readonly type = UserManagementRepositoryActions.DELETE_USERS_TRY;
    constructor(public payload?: IUserInterface) { }
}
export class DeleteUserSuccessAction {
    readonly type = UserManagementRepositoryActions.DELETE_USERS_SUCCESS;
    constructor(public payload?: IUserViewModelInterface) { }
}
export class DeleteUserErrorAction {
    readonly type = UserManagementRepositoryActions.DELETE_USERS_ERROR;
    constructor(public payload?: any) { }
}


export type UserManagementRepositoryActionUnion =
GetUserAction
| GetUserSuccessAction
| GetUserErrorAction
| CreateUserAction
| CreateUserSuccessAction
| CreateUserErrorAction
| DeleteUserAction
| DeleteUserSuccessAction
| DeleteUserErrorAction;

