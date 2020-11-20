import { IUserViewModelInterface } from 'src/app/shared/models/user-management.model';
import { ShiftHandoverModel } from 'src/app/shared/models/shift-user.model';

export enum ShiftUserActions {
    DELETE_SHIFT_USER_TRY = 'DELETE_SHIFT_USER_TRY',
    DELETE_SHIFT_USER_SUCCESS = 'DELETE_SHIFT_USER_SUCCESS',
    DELETE_SHIFT_USER_ERROR = 'DELETE_SHIFT_USER_ERROR',

    ADD_SHIFT_USER_TRY = 'ADD_SHIFT_USER_TRY',
    ADD_SHIFT_USER_SUCCESS = 'ADD_SHIFT_USER_SUCCESS',
    ADD_SHIFT_USER_ERROR = 'ADD_SHIFT_USER_ERROR',

    UPDATE_SHIFT_INCHARGE_TRY = 'UPDATE_SHIFT_INCHARGE_TRY',
    UPDATE_SHIFT_INCHARGE_SUCCESS = 'UPDATE_SHIFT_INCHARGE_SUCCESS',
    UPDATE_SHIFT_INCHARGE_ERROR = 'UPDATE_SHIFT_INCHARGE_ERROR',

    UPDATE_SHIFT_HANDOVER_TRY = 'UPDATE_SHIFT_HANDOVER_TRY',
    UPDATE_SHIFT_HANDOVER_SUCCESS = 'UPDATE_SHIFT_HANDOVER_SUCCESS',
    UPDATE_SHIFT_HANDOVER_ERROR = 'UPDATE_SHIFT_HANDOVER_ERROR',

    CONFIRM_SHIFT_USER_TRY = 'CONFIRM_SHIFT_USER_TRY',
    CONFIRM_SHIFT_USER_SUCCESS = 'CONFIRM_SHIFT_USER_SUCCESS',
    CONFIRM_SHIFT_USER_ERROR = 'CONFIRM_SHIFT_USER_ERROR'
}

export class DeleteShiftUserAction {
    readonly type = ShiftUserActions.DELETE_SHIFT_USER_TRY;
    constructor(public payload?: {logbookId: string, id: number}) {}
}

export class DeleteShiftUserSuccessAction {
    readonly type = ShiftUserActions.DELETE_SHIFT_USER_SUCCESS;
    constructor(public payload?: number) {}
}

export class DeleteShiftUserErrorAction {
    readonly type = ShiftUserActions.DELETE_SHIFT_USER_ERROR;
    constructor(public payload?: any) {}
}

export class AddShiftUserAction {
    readonly type = ShiftUserActions.ADD_SHIFT_USER_TRY;
    constructor(public payload?: IUserViewModelInterface) {}
}

export class AddShiftUserSuccessAction {
    readonly type = ShiftUserActions.ADD_SHIFT_USER_SUCCESS;
    constructor(public payload?: IUserViewModelInterface) {}
}

export class AddShiftUserErrorAction {
    readonly type = ShiftUserActions.ADD_SHIFT_USER_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateShiftInchargeAction {
    readonly type = ShiftUserActions.UPDATE_SHIFT_INCHARGE_TRY;
    constructor(public payload?: IUserViewModelInterface) {}
}

export class UpdateShiftInchargeSuccessAction {
    readonly type = ShiftUserActions.UPDATE_SHIFT_INCHARGE_SUCCESS;
    constructor(public payload?: IUserViewModelInterface) {}
}

export class UpdateShiftInchargeErrorAction {
    readonly type = ShiftUserActions.UPDATE_SHIFT_INCHARGE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateShiftHandoverAction {
    readonly type = ShiftUserActions.UPDATE_SHIFT_HANDOVER_TRY;
    constructor(public payload?: ShiftHandoverModel) {}
}

export class UpdateShiftHandoverSuccessAction {
    readonly type = ShiftUserActions.UPDATE_SHIFT_HANDOVER_SUCCESS;
    constructor(public payload?: ShiftHandoverModel) {}
}

export class UpdateShiftHandoverErrorAction {
    readonly type = ShiftUserActions.UPDATE_SHIFT_HANDOVER_ERROR;
    constructor(public payload?: any) {}
}

export class ConfirmShiftUserAction {
    readonly type = ShiftUserActions.CONFIRM_SHIFT_USER_TRY;
    constructor(public payload?: string) {}
}

export class ConfirmShiftUserSuccessAction {
    readonly type = ShiftUserActions.CONFIRM_SHIFT_USER_SUCCESS;
    constructor(public payload?: boolean) {}
}

export class ConfirmShiftUserErrorAction {
    readonly type = ShiftUserActions.CONFIRM_SHIFT_USER_ERROR;
    constructor(public payload?: any) {}
}

export type ShiftUserActionsUnion = DeleteShiftUserAction | DeleteShiftUserSuccessAction | DeleteShiftUserErrorAction
| AddShiftUserAction | AddShiftUserSuccessAction | AddShiftUserErrorAction
| UpdateShiftInchargeAction | UpdateShiftInchargeSuccessAction | UpdateShiftInchargeErrorAction
| UpdateShiftHandoverAction | UpdateShiftHandoverSuccessAction | UpdateShiftHandoverErrorAction
| ConfirmShiftUserAction | ConfirmShiftUserSuccessAction | ConfirmShiftUserErrorAction;
