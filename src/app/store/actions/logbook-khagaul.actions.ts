import { LogbookKhagaul } from 'src/app/e-logbook/models/Khagaul.model';

export enum KhagaulActions {
    GET_KHAGAUL_TRY = 'GET_KHAGAUL_TRY',
    GET_KHAGAUL_SUCCESS = 'GET_KHAGAUL_SUCCESS',
    GET_KHAGAUL_ERROR = 'GET_KHAGAUL_ERROR',
    ADD_KHAGAUL_TRY = 'ADD_KHAGAUL_TRY',
    ADD_KHAGAUL_SUCCESS = 'ADD_KHAGAUL_SUCCESS',
    ADD_KHAGAUL_ERROR = 'ADD_KHAGAUL_ERROR',
    UPDATE_KHAGAUL_TRY = 'UPDATE_KHAGAUL_TRY',
    UPDATE_KHAGAUL_SUCCESS = 'UPDATE_KHAGAUL_SUCCESS',
    UPDATE_KHAGAUL_ERROR = 'UPDATE_KHAGAUL_ERROR',
}
export class GetKhagaulAction {
    readonly type = KhagaulActions.GET_KHAGAUL_TRY;
    constructor(public payload?: string) {}
}

export class GetKhagaulSuccessAction {
    readonly type = KhagaulActions.GET_KHAGAUL_SUCCESS;
    constructor(public payload?: LogbookKhagaul) {}
}

export class GetKhagaulErrorAction {
    readonly type = KhagaulActions.GET_KHAGAUL_ERROR;
    constructor(public payload?: any) {}
}
export class AddKhagaulAction {
    readonly type = KhagaulActions.ADD_KHAGAUL_TRY;
    constructor(public payload?: LogbookKhagaul) {}
}

export class AddKhagaulSuccessAction {
    readonly type = KhagaulActions.ADD_KHAGAUL_SUCCESS;
    constructor(public payload?: LogbookKhagaul) {}
}

export class AddKhagaulErrorAction {
    readonly type = KhagaulActions.ADD_KHAGAUL_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateKhagaulAction {
    readonly type = KhagaulActions.UPDATE_KHAGAUL_TRY;
    constructor(public payload?: LogbookKhagaul) {}
}

export class UpdateKhagaulSuccessAction {
    readonly type = KhagaulActions.UPDATE_KHAGAUL_SUCCESS;
    constructor(public payload?: LogbookKhagaul) {}
}

export class UpdateKhagaulErrorAction {
    readonly type = KhagaulActions.UPDATE_KHAGAUL_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookKhagaulActionsUnion =  GetKhagaulAction
| GetKhagaulSuccessAction | GetKhagaulErrorAction| AddKhagaulAction
| AddKhagaulSuccessAction | AddKhagaulErrorAction| UpdateKhagaulAction
| UpdateKhagaulSuccessAction | UpdateKhagaulErrorAction;
