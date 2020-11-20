import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';
import { DashboardStore } from '../dashboard.store';

export const handleGetDashboardFscTcscSuccess = (state: DashboardStore,
                                                 action: RootActions.GetDashboardFscTcscSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    newState.dashboardData.FSCTCSCData = data;
    return newState;
};

export const handleGetDashboardStatcomSuccess = (state: DashboardStore,
                                                 action: RootActions.GetDashboardStatcomSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    newState.dashboardData.STATCOMData = data;
    return newState;
};
