import { AsyncRequestModel } from '../shared/models/async-request.model';
import { LogbookDashboard } from '../shared/models/logbook-dashboard.model';

export interface LogbookDashboardStore extends AsyncRequestModel {
    logbookDashboardData: LogbookDashboard[];
}

export const INITIAL_LOGBOOK_DASHBOARD: LogbookDashboardStore = {
    logbookDashboardData: [],
    error: null,
    pending: false,
    issued: false
};

