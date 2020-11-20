import { PowerChangeOver } from 'src/app/shared/models/power-change-over.model';

export enum PCOActions {
    ADD_PCO_CODE_TRY = 'ADD_PCO_CODE_TRY',
    ADD_PCO_CODE_SUCCESS = 'ADD_PCO_CODE_SUCCESS',
    ADD_PCO_CODE_ERROR = 'ADD_PCO_CODE_ERROR',

    UPDATE_PCO_DATA_TRY = 'UPDATE_PCO_DATA_TRY',
    UPDATE_PCO_DATA_SUCCESS = 'UPDATE_PCO_DATA_SUCCESS',
    UPDATE_PCO_DATA_ERROR = 'UPDATE_PCO_DATA_ERROR',

    CANCEL_PCO_CODE_TRY = 'CANCEL_PCO_CODE_TRY',
    CANCEL_PCO_CODE_SUCCESS = 'CANCEL_PCO_CODE_SUCCESS',
    CANCEL_PCO_CODE_ERROR = 'CANCEL_PCO_CODE_ERROR'
}

export class AddPCOCodeAction {
    readonly type = PCOActions.ADD_PCO_CODE_TRY;
    constructor(public payload?: PowerChangeOver) {}
}

export class AddPCOCodeSuccessAction {
    readonly type = PCOActions.ADD_PCO_CODE_SUCCESS;
    constructor(public payload?: PowerChangeOver) {}
}

export class AddPCOCOdeErrorAction {
    readonly type = PCOActions.ADD_PCO_CODE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdatePCODataAction {
    readonly type = PCOActions.UPDATE_PCO_DATA_TRY;
    constructor(public payload?: PowerChangeOver) {}
}

export class UpdatePCODataSuccessAction {
    readonly type = PCOActions.UPDATE_PCO_DATA_SUCCESS;
    constructor(public payload?: PowerChangeOver) {}
}

export class UpdatePCODataErrorAction {
    readonly type = PCOActions.UPDATE_PCO_DATA_ERROR;
    constructor(public payload?: any) {}
}

export class CancelPCOCodeAction {
    readonly type = PCOActions.CANCEL_PCO_CODE_TRY;
    constructor(public payload?: PowerChangeOver) {}
}

export class CancelPCOCodeSuccessAction {
    readonly type = PCOActions.CANCEL_PCO_CODE_SUCCESS;
    constructor(public payload?: PowerChangeOver) {}
}

export class CancelPCOCodeErrorAction {
    readonly type = PCOActions.CANCEL_PCO_CODE_ERROR;
    constructor(public payload?: any) {}
}

export type PCOActionsUnion = AddPCOCodeAction | AddPCOCodeSuccessAction | AddPCOCOdeErrorAction
| UpdatePCODataAction | UpdatePCODataSuccessAction | UpdatePCODataErrorAction
| CancelPCOCodeAction | CancelPCOCodeSuccessAction | CancelPCOCodeErrorAction;
