import { ReportingStore, INITIAL_REPORTING_DATA } from '../reporting.store';
import * as RootActions from '../actions/index';

export function ReportingReducer(state: ReportingStore = INITIAL_REPORTING_DATA,
                                 action: RootActions.ReportsActionUnion) {
    switch (action.type) {
        case RootActions.ReportActions.VIOLATION_MESSAGE_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ReportActions.VIOLATION_MESSAGE_REPORT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { reportingData: { ViolationReportData: action.payload  } });
        case RootActions.ReportActions.VIOLATION_MESSAGE_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ReportActions.ELEMENT_WISE_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ReportActions.ELEMENT_WISE_REPORT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { reportingData: { ElementWiseReport: action.payload  } });
        case RootActions.ReportActions.ELEMENT_WISE_REPORT_FAIL:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case RootActions.ReportActions.TIE_LINES_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ReportActions.TIE_LINES_REPORT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { reportingData: { TieLinesReportData: action.payload  } });
        case RootActions.ReportActions.TIE_LINES_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
