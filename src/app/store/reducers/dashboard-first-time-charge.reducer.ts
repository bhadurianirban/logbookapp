import { DashboardStore } from '../dashboard.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleFTCDashboardUpdateSuccessAction = (state: DashboardStore,
                                                     action: RootActions.UpdateDashboardFirstTimeChargeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const updatedData = action.payload.updatedData;
    const prevousData = action.payload.previousData;
    // find the tripping element
    if (updatedData.RequestId === prevousData.RequestId) {
        const elementIndex = newState.dashboardData.FirstTimeChargeData.findIndex(x => x.RequestId === updatedData.RequestId);
        if (elementIndex > -1) {
            newState.dashboardData.FirstTimeChargeData[elementIndex] = updatedData;
        }
    } else {
        // remove previous data and add new data
        const elementIndex = newState.dashboardData.FirstTimeChargeData.findIndex(x => x.RequestId === prevousData.RequestId);
        if (elementIndex > -1) {
            newState.dashboardData.FirstTimeChargeData.splice(elementIndex, 1, updatedData);
        }
    }
    return newState;
};

export const handleDashboardDeleteFirstTimeChargeSuccessAction = (state: DashboardStore,
                                                              action: RootActions.DeleteFirstTimeChargeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the first time charge element
    const elementIndex = newState.dashboardData.FirstTimeChargeData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.dashboardData.FirstTimeChargeData.splice(elementIndex, 1);
    }
    return newState;
};
