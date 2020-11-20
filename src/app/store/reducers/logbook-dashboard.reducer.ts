import { LogbookDashboardStore, INITIAL_LOGBOOK_DASHBOARD } from '../logbook-dashboard.store';
import { LogbookDashboardActionsUnion, LogbookDashboardActions } from '../actions';

export function LogbookDashboardReducer(state: LogbookDashboardStore = INITIAL_LOGBOOK_DASHBOARD, action: LogbookDashboardActionsUnion) {
    switch (action.type) {
        case LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { logbookDashboardData: action.payload });
        case LogbookDashboardActions.LOAD_LOGBOOK_DASHBOARD_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
