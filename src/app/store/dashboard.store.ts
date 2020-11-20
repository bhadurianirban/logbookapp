import { AsyncRequestModel } from '../shared/models/async-request.model';
import { IDashboard } from '../shared/models/dashboard-model';

export interface DashboardStore extends AsyncRequestModel {
    dashboardData: IDashboard;
}

export const INITIAL_DASHBOARD: DashboardStore = {
    dashboardData: null,
    error: null,
    pending: false,
    issued: false
};
