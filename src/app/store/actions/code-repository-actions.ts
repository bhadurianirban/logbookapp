import { CodeBase, CodeBaseViewModel } from 'src/app/shared/models/code-base.model';
import { LoadViewModel } from 'src/app/shared/models/load-management.model';

export enum CodeRepositoryActions {
    CREATE_CODE_TRY = 'CREATE_CODE_TRY',
    CREATE_LOGBOOK_CODE_SUCCESS = 'CREATE_LOGBOOK_CODE_SUCCESS',
    CREATE_DASHBOARD_CODE_SUCCESS = 'CREATE_DASHBOARD_CODE_SUCCESS',
    CREATE_CODE_ERROR = 'CREATE_CODE_ERROR',

    CREATE_LOAD_CODE_TRY = 'CREATE_LOAD_CODE_TRY',
    CREATE_LOAD_CODE_SUCCESS = 'CREATE_LOAD_CODE_SUCCESS',
    CREATE_LOAD_CODE_ERROR = 'CREATE_LOAD_CODE_ERROR',

    CANCEL_CODE_TRY = 'CANCEL_CODE_TRY',
    CANCEL_LOGBOOK_CODE_SUCCESS = 'CANCEL_LOGBOOK_CODE_SUCCESS',
    CANCEL_DASHBOARD_CODE_SUCCESS = 'CANCEL_DASHBOARD_CODE_SUCCESS',
    CANCEL_CODE_ERROR = 'CANCEL_CODE_ERROR',

    GET_LOGBOK_CODES_TRY = 'GET_LOGBOK_CODES_TRY',
    GET_LOGBOK_CODES_SUCCESS = 'GET_LOGBOK_CODES_SUCCESS',
    GET_LOGBOK_CODES_ERROR = 'GET_LOGBOK_CODES_ERROR',

    GET_ALL_CODES_TRY = 'GET_ALL_CODES_TRY',
    GET_ALL_CODES_SUCCESS = 'GET_ALL_CODES_SUCCESS',
    GET_ALL_CODES_ERROR = 'GET_ALL_CODES_ERROR',

    GET_PENDING_CODES_TRY = 'GET_PENDING_CODES_TRY',
    GET_PENDING_CODES_SUCCESS = 'GET_PENDING_CODES_SUCCESS',
    GET_PENDING_CODES_ERROR = 'GET_PENDING_CODES_ERROR'
}
export class CreateCodeAction {
    readonly type = CodeRepositoryActions.CREATE_CODE_TRY;
    constructor(public payload?: { code: CodeBase, createdFrom: string }) {}
}

export class CreateLogbookCodeSuccessAction {
    readonly type = CodeRepositoryActions.CREATE_LOGBOOK_CODE_SUCCESS;
    constructor(public payload?: CodeBase) {}
}

export class CreateDashboardCodeSuccessAction {
    readonly type = CodeRepositoryActions.CREATE_DASHBOARD_CODE_SUCCESS;
    constructor(public payload?: CodeBase) {}
}

export class CreateCodeErrorAction {
    readonly type = CodeRepositoryActions.CREATE_CODE_ERROR;
    constructor(public payload?: any) {}
}

export class CancelCodeAction {
    readonly type = CodeRepositoryActions.CANCEL_CODE_TRY;
    constructor(public payload?: { code: CodeBase, createdFrom: string }) {}
}

export class CancelLogbookCodeSuccessAction {
    readonly type = CodeRepositoryActions.CANCEL_LOGBOOK_CODE_SUCCESS;
    constructor(public payload?: CodeBase) {}
}

export class CancelDashboardCodeSuccessAction {
    readonly type = CodeRepositoryActions.CANCEL_DASHBOARD_CODE_SUCCESS;
    constructor(public payload?: CodeBase) {}
}

export class CancelCodeErrorAction {
    readonly type = CodeRepositoryActions.CANCEL_CODE_ERROR;
    constructor(public payload?: any) {}
}

export class GetLogbookCodesAction {
    readonly type = CodeRepositoryActions.GET_LOGBOK_CODES_TRY;
    constructor(public payload?: string) {}
}

export class GetLogbookCodesSuccessAction {
    readonly type = CodeRepositoryActions.GET_LOGBOK_CODES_SUCCESS;
    constructor(public payload?: CodeBaseViewModel[]) {}
}

export class GetLogbookCodesErrorAction {
    readonly type = CodeRepositoryActions.GET_LOGBOK_CODES_ERROR;
    constructor(public payload?: any) {}
}

export class GetAllCodesAction {
    readonly type = CodeRepositoryActions.GET_ALL_CODES_TRY;
    constructor(public payload?: string) {}
}

export class GetAllCodesSuccessAction {
    readonly type = CodeRepositoryActions.GET_ALL_CODES_SUCCESS;
    constructor(public payload?: CodeBaseViewModel[]) {}
}

export class GetAllCodesErrorAction {
    readonly type = CodeRepositoryActions.GET_ALL_CODES_ERROR;
    constructor(public payload?: any) {}
}

export class GetPendingCodesAction {
    readonly type = CodeRepositoryActions.GET_PENDING_CODES_TRY;
    constructor() {}
}

export class GetPendingCodesSuccessAction {
    readonly type = CodeRepositoryActions.GET_PENDING_CODES_SUCCESS;
    constructor(public payload?: CodeBaseViewModel[]) {}
}

export class GetPendingCodesErrorAction {
    readonly type = CodeRepositoryActions.GET_PENDING_CODES_ERROR;
    constructor(public payload?: any) {}
}

export class CreateLoadCodeAction {
    readonly type = CodeRepositoryActions.CREATE_LOAD_CODE_TRY;
    constructor(public payload?: LoadViewModel) {}
}

export class CreateLoadCodeSuccessAction {
    readonly type = CodeRepositoryActions.CREATE_LOAD_CODE_SUCCESS;
    constructor(public payload?: CodeBase) {}
}

export class CreateLoadCodeErrorAction {
    readonly type = CodeRepositoryActions.CREATE_LOAD_CODE_ERROR;
    constructor(public payload?: any) {}
}

export type CodeRepositoryActionUnion = CreateCodeAction | CreateLogbookCodeSuccessAction
| CreateCodeErrorAction | CreateDashboardCodeSuccessAction | CancelCodeAction | CancelLogbookCodeSuccessAction
| CancelDashboardCodeSuccessAction | CancelCodeErrorAction | GetLogbookCodesAction | GetLogbookCodesSuccessAction
| GetLogbookCodesErrorAction | GetAllCodesAction | GetAllCodesErrorAction | GetAllCodesSuccessAction
| GetPendingCodesAction | GetPendingCodesSuccessAction | GetPendingCodesErrorAction
| CreateLoadCodeAction | CreateLoadCodeSuccessAction | CreateLoadCodeErrorAction;
