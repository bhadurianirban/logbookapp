import { Action } from '@ngrx/store';
import { LogbookInstruction } from 'src/app/shared/models/logbook.model';

export enum InstructionActions {
    ADD_INSTRUCTION_TRY = 'ADD_INSTRUCTION_TRY',
    ADD_INSTRUCTION_SUCCESS = 'ADD_INSTRUCTION_SUCCESS',
    ADD_INSTRUCTION_ERROR = 'ADD_INSTRUCTION_ERROR'
}

export class AddInstructionAction implements Action {
    readonly type = InstructionActions.ADD_INSTRUCTION_TRY;
    constructor(public payload: LogbookInstruction) {}
}

export class AddInstructionSuccessAction implements Action {
    readonly type = InstructionActions.ADD_INSTRUCTION_SUCCESS;
    constructor(public payload: LogbookInstruction) {}
}

export class AddInstructionErrorAction implements Action {
    readonly type = InstructionActions.ADD_INSTRUCTION_ERROR;
    constructor(public payload?: any) {}
}

export type InstructionActionsUnion = AddInstructionAction | AddInstructionSuccessAction | AddInstructionErrorAction;
