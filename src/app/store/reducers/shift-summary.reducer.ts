import { ReportsStore, INITIAL_REPORT_REPO } from '../reports.store';
import { ReportActionsUnion, ReportsAction } from '../actions';
import { saveAs } from 'file-saver';

export function ReportReducer(state: ReportsStore = INITIAL_REPORT_REPO, action: ReportActionsUnion) {
    switch (action.type) {
        case ReportsAction.GET_SHIFT_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ReportsAction.GET_SHIFT_REPORT_SUCCESS:
            saveAs(action.payload.data.body, action.payload.fileName);
            return state;
        case ReportsAction.GET_SHIFT_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        case ReportsAction.GET_SHIFT_HANDOVER_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ReportsAction.GET_SHIFT_HANDOVER_REPORT_SUCCESS:
            saveAs(action.payload.data.body, action.payload.fileName);
            return state;
        case ReportsAction.GET_SHIFT_HANDOVER_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        default:
            return state;
    }
}
