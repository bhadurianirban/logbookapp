import { IssueValue } from 'src/app/shared/models/issue-value.model';

export enum IssueValueActions {
    ADD_ISSUE_VALUE_TRY = 'ADD_ISSUE_VALUE_TRY',
    ADD_ISSUE_VALUE_SUCCESS = 'ADD_ISSUE_VALUE_SUCCESS',
    ADD_ISSUE_VALUE_ERROR = 'ADD_ISSUE_VALUE_ERROR',

    UPDATE_ISSUE_VALUE_TRY = 'UPDATE_ISSUE_VALUE_TRY',
    UPDATE_ISSUE_VALUE_SUCCESS = 'UPDATE_ISSUE_VALUE_SUCCESS',
    UPDATE_ISSUE_VALUE_ERROR = 'UPDATE_ISSUE_VALUE_ERROR',

    GET_ISSUE_VALUES_TRY = 'GET_ISSUE_VALUE_TRY',
    GET_ISSUE_VALUES_SUCCESS = 'GET_ISSUE_VALUES_SUCCESS',
    GET_ISSUE_VALUES_ERROR = 'GET_ISSUE_VALUES_ERROR',

    DELETE_ISSUE_VALUES_TRY = 'DELETE_ISSUE_VALUES_TRY',
    DELETE_ISSUE_VALUES_SUCCESS = 'DELETE_ISSUE_VALUES_SUCCESS',
    DELETE_ISSUE_VALUES_ERROR = 'DELETE_ISSUE_VALUES_ERROR'
}

export class AddIssueValueAction {
    readonly type = IssueValueActions.ADD_ISSUE_VALUE_TRY;
    constructor(public payload?: IssueValue) {}
}

export class AddIssueValueSuccessAction {
    readonly type = IssueValueActions.ADD_ISSUE_VALUE_SUCCESS;
    constructor(public payload?: IssueValue) {}
}

export class AddIssueValueErrorAction {
    readonly type = IssueValueActions.ADD_ISSUE_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateIssueValueAction {
    readonly type = IssueValueActions.UPDATE_ISSUE_VALUE_TRY;
    constructor(public payload?: IssueValue) {}
}

export class UpdateIssueValueSuccessAction {
    readonly type = IssueValueActions.UPDATE_ISSUE_VALUE_SUCCESS;
    constructor(public payload?: IssueValue) {}
}

export class UpdateIssueValueErrorAction {
    readonly type = IssueValueActions.UPDATE_ISSUE_VALUE_ERROR;
    constructor(public payload?: any) {}
}

export class GetIssueValuesAction {
    readonly type = IssueValueActions.GET_ISSUE_VALUES_TRY;
    constructor() {}
}

export class GetIssueValuesSuccessAction {
    readonly type = IssueValueActions.GET_ISSUE_VALUES_SUCCESS;
    constructor(public payload?: IssueValue[]) {}
}

export class GetIssueValuesErrorAction {
    readonly type = IssueValueActions.GET_ISSUE_VALUES_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteIssueValuesAction {
    readonly type = IssueValueActions.DELETE_ISSUE_VALUES_TRY;
    constructor(public payload?: any) { }
}
export class DeleteIssueValuesSuccessAction {
    readonly type = IssueValueActions.DELETE_ISSUE_VALUES_SUCCESS;
    constructor(public payload?: IssueValue) { }
}
export class DeleteIssueValuesErrorAction {
    readonly type = IssueValueActions.DELETE_ISSUE_VALUES_ERROR;
    constructor(public payload?: any) { }
}

export type IssueValueActionsUnion = AddIssueValueAction | AddIssueValueSuccessAction | AddIssueValueErrorAction
| UpdateIssueValueAction | UpdateIssueValueSuccessAction | UpdateIssueValueErrorAction
// tslint:disable-next-line: max-line-length
| GetIssueValuesAction | GetIssueValuesSuccessAction | GetIssueValuesErrorAction| DeleteIssueValuesAction| DeleteIssueValuesSuccessAction| DeleteIssueValuesErrorAction;
