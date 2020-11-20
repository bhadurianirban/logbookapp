import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { EmployeeSummaryService } from 'src/app/duty-roster/services/employee-summary.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class EmployeeSummaryEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private summaryService: EmployeeSummaryService,
                private messageService: MessageService) {}

    @Effect()
    getEmloyeeSummaryAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetEmployeeSummaryAction) =>
            this.summaryService.getSummary(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetEmployeeSummarySuccessAction(result);
                }),
                    catchError(error => [new RootActions.GetEmployeeSummartErrorAction(error)])
            )
        )
    );

    @Effect()
    getEmloyeeSummarySuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Employee Shift Summary',
                 detail: 'Employee Summary Data loaded successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getEmloyeeSummaryError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Employee Shift Summary',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
