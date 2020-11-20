import { EmployeeSummaryStore, INITIAL_SUMMARY_DATA } from '../employee-summary.store';
import { EmployeeShiftSummaryActionsUnion, EmployeeShiftSummaryActions } from '../actions';

export function EmployeeShiftSummaryReducer(state: EmployeeSummaryStore = INITIAL_SUMMARY_DATA, action: EmployeeShiftSummaryActionsUnion) {
    switch (action.type) {
        case EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { summaryData: { summary: action.payload  } });
        case EmployeeShiftSummaryActions.GET_EMPLOYEE_SHIFT_SUMMARY_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
