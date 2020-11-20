import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingIndicatorAction } from '../actions';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import * as RootActions from '../actions/index';

@Injectable()
export class LogbookInstructionEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}

    @Effect()
    addInstruction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.InstructionActions.ADD_INSTRUCTION_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.AddInstructionAction) =>
        this.logbookService.addInstruction(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddInstructionSuccessAction(result);
            }),
                catchError(error => [new RootActions.AddInstructionErrorAction(error)])
        )
    )
    );

    @Effect()
    addInstructionSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.InstructionActions.ADD_INSTRUCTION_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Instruction',
                 detail: 'Instruction has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addInstructionError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.InstructionActions.ADD_INSTRUCTION_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Instruction',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
