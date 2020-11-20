import { DashboardStore } from '../dashboard.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleARDashboardUpdateSuccessAction = (state: DashboardStore,
                                                     action: RootActions.UpdateDashboardAutoRecloseSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const updatedData = action.payload.updatedData;
    const prevousData = action.payload.previousData;
    // find the tripping element
    if (updatedData.RequestId === prevousData.RequestId) {
        const elementIndex = newState.dashboardData.AutoRecloseData.findIndex(x => x.RequestId === updatedData.RequestId);
        if (elementIndex > -1) {
            newState.dashboardData.AutoRecloseData[elementIndex] = updatedData;
        }
    } else {
        // remove previous data and add new data
        const elementIndex = newState.dashboardData.AutoRecloseData.findIndex(x => x.RequestId === prevousData.RequestId);
        if (elementIndex > -1) {
            newState.dashboardData.AutoRecloseData.splice(elementIndex, 1, updatedData);
        }
    }
    return newState;
};

export const handleDashboardDeleteAutoRecloseSuccessAction = (state: DashboardStore,
                                                              action: RootActions.DeleteAutoRecloseSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the auto reclose element
    const elementIndex = newState.dashboardData.AutoRecloseData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.dashboardData.AutoRecloseData.splice(elementIndex, 1);
    }
    return newState;
};
