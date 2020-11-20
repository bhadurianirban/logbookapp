import { LogbookSchedulingDetail } from 'src/app/shared/models/logbook.model';

export enum SchedulingActions {
    ADD_SCHEDULING_TRY = 'ADD_SCHEDULING_TRY',
    ADD_SCHEDULING_SUCCESS = 'ADD_SCHEDULING_SUCCESS',
    ADD_SCHEDULING_ERROR = 'ADD_SCHEDULING_ERROR',

    UPDATE_SCHEDULING_TRY = 'UPDATE_SCHEDULING_TRY',
    UPDATE_SCHEDULING_SUCCESS = 'UPDATE_SCHEDULING_SUCCESS',
    UPDATE_SCHEDULING_ERROR = 'UPDATE_SCHEDULING_ERROR',

    DELETE_SCHEDULING_TRY = 'DELETE_SCHEDULING_TRY',
    DELETE_SCHEDULING_SUCCESS = 'DELETE_SCHEDULING_SUCCESS',
    DELETE_SCHEDULING_ERROR = 'DELETE_SCHEDULING_ERROR'
}

export class AddSchedulingAction {
    readonly type = SchedulingActions.ADD_SCHEDULING_TRY;
    constructor(public payload?: LogbookSchedulingDetail) {}
}

export class AddSchedulingSuccessAction {
    readonly type = SchedulingActions.ADD_SCHEDULING_SUCCESS;
    constructor(public payload?: LogbookSchedulingDetail) {}
}

export class AddSchedulingErrorAction {
    readonly type = SchedulingActions.ADD_SCHEDULING_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateSchedulingAction {
    readonly type = SchedulingActions.UPDATE_SCHEDULING_TRY;
    constructor(public payload?: LogbookSchedulingDetail) {}
}

export class UpdateSchedulingSuccessAction {
    readonly type = SchedulingActions.UPDATE_SCHEDULING_SUCCESS;
    constructor(public payload?: LogbookSchedulingDetail) {}
}

export class UpdateSchedulingErrorAction {
    readonly type = SchedulingActions.UPDATE_SCHEDULING_ERROR;
    constructor(public payload?: any) {}
}

export class DeleteSchedulingAction {
    readonly type = SchedulingActions.DELETE_SCHEDULING_TRY;
    constructor(public payload?: LogbookSchedulingDetail) {}
}

export class DeleteSchedulingSuccessAction {
    readonly type = SchedulingActions.DELETE_SCHEDULING_SUCCESS;
    constructor(public payload?: LogbookSchedulingDetail) {}
}

export class DeleteSchedulingErrorAction {
    readonly type = SchedulingActions.DELETE_SCHEDULING_ERROR;
    constructor(public payload?: any) {}
}

export type LogbookSchedulingActionsUnion = AddSchedulingAction | AddSchedulingSuccessAction
| AddSchedulingErrorAction | UpdateSchedulingAction | UpdateSchedulingSuccessAction
 | UpdateSchedulingErrorAction | DeleteSchedulingAction | DeleteSchedulingSuccessAction | DeleteSchedulingErrorAction;

