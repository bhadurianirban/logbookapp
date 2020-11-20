import { Action } from '@ngrx/store';
import { LoadViewModel } from 'src/app/shared/models/load-management.model';

export enum LoadManagementActions {
    ADD_LOGBOOK_LOAD_TRY = 'ADD_LOGBOOK_LOAD_TRY',
    ADD_LOGBOOK_LOAD_SUCCESS = 'ADD_LOGBOOK_LOAD_SUCCESS',
    ADD_LOGBOOK_LOAD_FAIL = 'ADD_LOGBOOK_LOAD_FAIL',

    UPDATE_LOGBOOK_LOAD_TRY = 'UPDATE_LOGBOOK_LOAD_TRY',
    UPDATE_LOGBOOK_LOAD_SUCCESS = 'UPDATE_LOGBOOK_LOAD_SUCCESS',
    UPDATE_LOGBOOK_LOAD_FAIL = 'UPDATE_LOGBOOK_LOAD_FAIL'
}

export class AddLogbookLoadAction implements Action {
    readonly type = LoadManagementActions.ADD_LOGBOOK_LOAD_TRY;
    constructor(public payload: LoadViewModel) {}
}

export class AddLogbookLoadSuccessAction implements Action {
    readonly type = LoadManagementActions.ADD_LOGBOOK_LOAD_SUCCESS;
    constructor(public payload: LoadViewModel) {}
}

export class AddLogbookLoadFailAction implements Action {
    readonly type = LoadManagementActions.ADD_LOGBOOK_LOAD_FAIL;
    constructor(public payload?: any) {}
}

export class UpdateLogbookLoadAction implements Action {
    readonly type = LoadManagementActions.UPDATE_LOGBOOK_LOAD_TRY;
    constructor(public payload: LoadViewModel) {}
}

export class UpdateLogbookLoadSuccessAction implements Action {
    readonly type = LoadManagementActions.UPDATE_LOGBOOK_LOAD_SUCCESS;
    constructor(public payload: LoadViewModel) {}
}

export class UpdateLogbookLoadFailAction implements Action {
    readonly type = LoadManagementActions.UPDATE_LOGBOOK_LOAD_FAIL;
    constructor(public payload?: any) {}
}

export type LogbookLoadActionsUnion = AddLogbookLoadAction | AddLogbookLoadSuccessAction | AddLogbookLoadFailAction
| UpdateLogbookLoadAction | UpdateLogbookLoadSuccessAction | UpdateLogbookLoadFailAction;
