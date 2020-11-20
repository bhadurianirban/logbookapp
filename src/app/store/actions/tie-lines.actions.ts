import { Action } from '@ngrx/store';
import { DayWiseTieLine } from '../../shared/models/load-management.model';

export enum TieLineActions {
    CAPTURE_TIE_LINE_DATA_TRY = 'CAPTURE_TIE_LINE_DATA_TRY',
    CAPTURE_TIE_LINE_DATA_SUCCESS = 'CAPTURE_TIE_LINE_DATA_SUCCESS',
    CAPTURE_TIE_LINE_DATA_ERROR = 'CAPTURE_TIE_LINE_DATA_ERROR',

    UPDATE_TIE_LINE_DATA_TRY = 'UPDATE_TIE_LINE_DATA_TRY',
    UPDATE_TIE_LINE_DATA_SUCCESS = 'UPDATE_TIE_LINE_DATA_SUCCESS',
    UPDATE_TIE_LINE_DATA_ERROR = 'UPDATE_TIE_LINE_DATA_ERROR'
}

export class CaptureTieLineAction implements Action {
    readonly type = TieLineActions.CAPTURE_TIE_LINE_DATA_TRY;
    constructor(public payload: string) {}
}

export class CaptureTieLineSuccessAction implements Action {
    readonly type = TieLineActions.CAPTURE_TIE_LINE_DATA_SUCCESS;
    constructor(public payload: DayWiseTieLine []) {}
}

export class CaptureTieLineErrorAction implements Action {
    readonly type = TieLineActions.CAPTURE_TIE_LINE_DATA_ERROR;
    constructor(public payload?: any) {}
}

export class UpdateTieLineAction implements Action {
    readonly type = TieLineActions.UPDATE_TIE_LINE_DATA_TRY;
    constructor(public payload: DayWiseTieLine []) {}
}

export class UpdateTieLineSuccessAction implements Action {
    readonly type = TieLineActions.UPDATE_TIE_LINE_DATA_SUCCESS;
    constructor(public payload: DayWiseTieLine []) {}
}

export class UpdateTieLineErrorAction implements Action {
    readonly type = TieLineActions.UPDATE_TIE_LINE_DATA_ERROR;
    constructor(public payload?: any) {}
}
export type TieLineActionsUnion = CaptureTieLineAction | CaptureTieLineSuccessAction | CaptureTieLineErrorAction
                                  |UpdateTieLineAction | UpdateTieLineSuccessAction | UpdateTieLineErrorAction;
