import { IUserViewModelInterface } from 'src/app/shared/models/user-management.model';

export enum UserAuthActions {
    GET_LOGGED_IN_USER_TRY = 'GET_LOGGED_IN_USER_TRY',
    GET_LOGGED_IN_USER_SUCCESS = 'GET_LOGGED_IN_USER_SUCCESS',
    GET_LOGGED_IN_USER_ERROR = 'GET_LOGGED_IN_USER_ERROR'
}

export class GetLoggedInUserAction {
    readonly type = UserAuthActions.GET_LOGGED_IN_USER_TRY;
    constructor(public payload?: {userName: string, password: string}) {}
}

export class GetLoggedInUserSuccessAction {
    readonly type = UserAuthActions.GET_LOGGED_IN_USER_SUCCESS;
    constructor(public payload?: IUserViewModelInterface) {}
}

export class GetLoggedInUserErrorAction {
    readonly type = UserAuthActions.GET_LOGGED_IN_USER_ERROR;
    constructor(public payload?: any) {}
}

export type UserLoginActionsUnion = GetLoggedInUserAction | GetLoggedInUserSuccessAction | GetLoggedInUserErrorAction;
