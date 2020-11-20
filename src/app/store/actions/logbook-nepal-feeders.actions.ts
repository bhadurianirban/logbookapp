import { LogbookNepalFeeder } from 'src/app/e-logbook/models/NepalFeeder.model';

export enum NepalFeedersActions {
    GET_NEPAL_FEEDERS_TRY = 'GET_NEPAL_FEEDERS_TRY',
    GET_NEPAL_FEEDERS_SUCCESS = 'GET_NEPAL_FEEDERS_SUCCESS',
    GET_NEPAL_FEEDERS_ERROR = 'GET_NEPAL_FEEDERS_ERROR',
    ADD_NEPAL_FEEDERS_TRY = 'ADD_NEPAL_FEEDERS_TRY',
    ADD_NEPAL_FEEDERS_SUCCESS = 'ADD_NEPAL_FEEDERS_SUCCESS',
    ADD_NEPAL_FEEDERS_ERROR = 'ADD_NEPAL_FEEDERS_ERROR',
    UPDATE_NEPAL_FEEDERS_TRY = 'UPDATE_NEPAL_FEEDERS_TRY',
    UPDATE_NEPAL_FEEDERS_SUCCESS = 'UPDATE_NEPAL_FEEDERS_SUCCESS',
    UPDATE_NEPAL_FEEDERS_ERROR = 'UPDATE_NEPAL_FEEDERS_ERROR',
}
export class GetNepalFeedersAction {
    readonly type = NepalFeedersActions.GET_NEPAL_FEEDERS_TRY;
    constructor(public payload?: string) {}
}

export class GetNepalFeedersSuccessAction {
    readonly type = NepalFeedersActions.GET_NEPAL_FEEDERS_SUCCESS;
    constructor(public payload?: LogbookNepalFeeder) {}
}

export class GetNepalFeedersErrorAction {
    readonly type = NepalFeedersActions.GET_NEPAL_FEEDERS_ERROR;
    constructor(public payload?: any) {}
}
export class AddNepalFeedersAction {
    readonly type = NepalFeedersActions.ADD_NEPAL_FEEDERS_TRY;
    constructor(public payload?: LogbookNepalFeeder) {}
}

export class AddNepalFeedersSuccessAction {
    readonly type = NepalFeedersActions.ADD_NEPAL_FEEDERS_SUCCESS;
    constructor(public payload?: LogbookNepalFeeder) {}
}

export class AddNepalFeedersErrorAction {
    readonly type = NepalFeedersActions.ADD_NEPAL_FEEDERS_ERROR;
    constructor(public payload?: any) {}
}
export class UpdateNepalFeedersAction {
    readonly type = NepalFeedersActions.UPDATE_NEPAL_FEEDERS_TRY;
    constructor(public payload?: LogbookNepalFeeder) {}
}

export class UpdateNepalFeedersSuccessAction {
    readonly type = NepalFeedersActions.UPDATE_NEPAL_FEEDERS_SUCCESS;
    constructor(public payload?: LogbookNepalFeeder) {}
}

export class UpdateNepalFeedersErrorAction {
    readonly type = NepalFeedersActions.UPDATE_NEPAL_FEEDERS_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookNepalFeedersActionsUnion =  GetNepalFeedersAction
| GetNepalFeedersSuccessAction | GetNepalFeedersErrorAction| AddNepalFeedersAction
| AddNepalFeedersSuccessAction | AddNepalFeedersErrorAction| UpdateNepalFeedersAction
| UpdateNepalFeedersSuccessAction | UpdateNepalFeedersErrorAction;
