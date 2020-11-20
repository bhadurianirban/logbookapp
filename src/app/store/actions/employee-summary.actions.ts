import { EmployeeSummaryModel } from 'src/app/shared/models/employee-summary.model';

export enum EmployeeShiftSummaryActions {
    GET_EMPLOYEE_SHIFT_SUMMARY_TRY = 'GET_EMPLOYEE_SHIFT_SUMMARY_TRY',
    GET_EMPLOYEE_SHIFT_SUMMARY_SUCCESS = 'GET_EMPLOYEE_SHIFT_SUMMARY_SUCCESS',
    GET_EMPLOYEE_SHIFT_SUMMARY_ERROR = 'GET_EMPLOYEE_SHIFT_SUMMARY_ERROR'
}

export class GetEmployeeSummaryAction {
    readonly type = EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_TRY;
    constructor(public payload?: string) {}
}

export class GetEmployeeSummarySuccessAction {
    readonly type = EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_SUCCESS;
    constructor(public payload?: EmployeeSummaryModel) {}
}

export class GetEmployeeSummartErrorAction {
    readonly type = EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_ERROR;
    constructor(public payload?: any) {}
}

export type EmployeeShiftSummaryActionsUnion = GetEmployeeSummaryAction | GetEmployeeSummarySuccessAction | GetEmployeeSummartErrorAction;
