import { LogbookViolationMessage } from 'src/app/shared/models/logbook.model';

export enum ViolationMessageActions {
    ADD_VIOLATION_MESSAGE_TRY = 'ADD_VIOLATION_MESSAGE_TRY',
    ADD_VIOLATION_MESSAGE_SUCCESS = 'ADD_VIOLATION_MESSAGE_SUCCESS',
    ADD_VIOLATION_MESSAGE_ERROR = 'ADD_VIOLATION_MESSAGE_ERROR',

    UPDATE_VIOLATION_MESSAGE_TRY = 'UPDATE_VIOLATION_MESSAGE_TRY',
    UPDATE_VIOLATION_MESSAGE_SUCCESS = 'UPDATE_VIOLATION_MESSAGE_SUCCESS',
    UPDATE_VIOLATION_MESSAGE_ERROR = 'UPDATE_VIOLATION_MESSAGE_ERROR',

    DELETE_VIOLATION_MESSAGE_TRY = 'DELETE_VIOLATION_MESSAGE_TRY',
    DELETE_VIOLATION_MESSAGE_SUCCESS = 'DELETE_VIOLATION_MESSAGE_SUCCESS',
    DELETE_VIOLATION_MESSAGE_ERROR = 'DELETE_VIOLATION_MESSAGE_ERROR',

    MESSAGE_DOWNLOAD_TRY = 'MESSAGE_DOWNLOAD_TRY',
    MESSAGE_DOWNLOAD_SUCCESS = 'MESSAGE_DOWNLOAD_SUCCESS',
    MESSAGE_DOWNLOAD_ERROR = 'MESSAGE_DOWNLOAD_ERROR'
}

export class AddViolationMessageAction {
    readonly type = ViolationMessageActions.ADD_VIOLATION_MESSAGE_TRY;
    constructor(public payload?: LogbookViolationMessage) {}
}

export class AddViolationMessageSuccessAction {
    readonly type = ViolationMessageActions.ADD_VIOLATION_MESSAGE_SUCCESS;
    constructor(public payload?: LogbookViolationMessage) {}
}

export class AddViolationMessageErrorAction {
    readonly type = ViolationMessageActions.ADD_VIOLATION_MESSAGE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateViolationMessageAction {
    readonly type = ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_TRY;
    constructor(public payload?: LogbookViolationMessage) {}
}

export class UpdateViolationMessageSuccessAction {
    readonly type = ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_SUCCESS;
    constructor(public payload?: LogbookViolationMessage) {}
}

export class UpdateViolationMessageErrorAction {
    readonly type = ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteViolationMessageAction {
    readonly type = ViolationMessageActions.DELETE_VIOLATION_MESSAGE_TRY;
    constructor(public payload?: LogbookViolationMessage) {}
}

export class DeleteViolationMessageSuccessAction {
    readonly type = ViolationMessageActions.DELETE_VIOLATION_MESSAGE_SUCCESS;
    constructor(public payload?: LogbookViolationMessage) {}
}

export class DeleteViolationMessageErrorAction {
    readonly type = ViolationMessageActions.DELETE_VIOLATION_MESSAGE_ERROR;
    constructor(public payload?: any) {}
}

export class DownloadViolationMessageAction {
    readonly type = ViolationMessageActions.MESSAGE_DOWNLOAD_TRY;
    constructor(public payload?: string) {}
}

export class DownloadViolationMessageSuccessAction {
    readonly type = ViolationMessageActions.MESSAGE_DOWNLOAD_SUCCESS;
    constructor(public payload?: any) {}
}

export class DownloadViolationMessageErrorAction {
    readonly type = ViolationMessageActions.MESSAGE_DOWNLOAD_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookViolationMessageActionsUnion = AddViolationMessageAction | AddViolationMessageSuccessAction
| AddViolationMessageErrorAction | UpdateViolationMessageAction | UpdateViolationMessageSuccessAction
| UpdateViolationMessageErrorAction | DeleteViolationMessageAction | DeleteViolationMessageSuccessAction
| DeleteViolationMessageErrorAction | DownloadViolationMessageAction | DownloadViolationMessageSuccessAction
| DownloadViolationMessageErrorAction;
