import { Issue } from 'src/app/shared/models/logbook.model';

export enum IssueActions {
    ADD_ISSUE_TRY = 'ADD_ISSUE_TRY',
    ADD_ISSUE_SUCCESS = 'ADD_ISSUE_SUCCESS',
    ADD_ISSUE_ERROR = 'ADD_ISSUE_ERROR',

    UPDATE_ISSUE_TRY = 'UPDATE_ISSUE_TRY',
    UPDATE_ISSUE_SUCCESS = 'UPDATE_ISSUE_SUCCESS',
    UPDATE_ISSUE_ERROR = 'UPDATE_ISSUE_ERROR',

    DELETE_ISSUE_TRY = 'DELETE_ISSUE_TRY',
    DELETE_ISSUE_SUCCESS = 'DELETE_ISSUE_SUCCESS',
    DELETE_ISSUE_ERROR = 'DELETE_ISSUE_ERROR'
}

export class AddIssueAction {
    readonly type = IssueActions.ADD_ISSUE_TRY;
    constructor(public payload?: Issue) {}
}

export class AddIssueSuccessAction {
    readonly type = IssueActions.ADD_ISSUE_SUCCESS;
    constructor(public payload?: Issue) {}
}

export class AddIssueErrorAction {
    readonly type = IssueActions.ADD_ISSUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateIssueAction {
    readonly type = IssueActions.UPDATE_ISSUE_TRY;
    constructor(public payload?: Issue) {}
}

export class UpdateIssueSuccessAction {
    readonly type = IssueActions.UPDATE_ISSUE_SUCCESS;
    constructor(public payload?: Issue) {}
}

export class UpdateIssueErrorAction {
    readonly type = IssueActions.UPDATE_ISSUE_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteIssueAction {
    readonly type = IssueActions.DELETE_ISSUE_TRY;
    constructor(public payload?: Issue) {}
}

export class DeleteIssueSuccessAction {
    readonly type = IssueActions.DELETE_ISSUE_SUCCESS;
    constructor(public payload?: Issue) {}
}

export class DeleteIssueErrorAction {
    readonly type = IssueActions.DELETE_ISSUE_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookIssueActionsUnion = AddIssueAction | AddIssueSuccessAction | AddIssueErrorAction | UpdateIssueAction
| UpdateIssueSuccessAction | UpdateIssueErrorAction | DeleteIssueAction | DeleteIssueSuccessAction | DeleteIssueErrorAction;

