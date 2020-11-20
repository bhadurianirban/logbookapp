import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';
import { DashboardStore } from '../dashboard.store';

export const handleAntiTheftDashboardUpdateSuccessAction = (state: DashboardStore,
                                                            action: RootActions.UpdateDashboardAntiTheftSuccessAction):
                                                            DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const updatedData = action.payload.updatedData;
    const prevousData = action.payload.previousData;
    // find the tripping element
    if (updatedData.RequestId === prevousData.RequestId) {
        const elementIndex = newState.dashboardData.AntiTheftElements.findIndex(x => x.RequestId === updatedData.RequestId);
        if (elementIndex > -1) {
            newState.dashboardData.AntiTheftElements[elementIndex] = updatedData;
        }
    } else {
        // remove previous data and add new data
        const elementIndex = newState.dashboardData.AntiTheftElements.findIndex(x => x.RequestId === prevousData.RequestId);
        if (elementIndex > -1) {
            newState.dashboardData.AntiTheftElements.splice(elementIndex, 1, updatedData);
        }
    }
    return newState;
};

export const handleDashboardDeleteAntiTheftSuccessAction = (state: DashboardStore,
                                                            action: RootActions.DeleteAntiTheftSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.dashboardData.AntiTheftElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.dashboardData.AntiTheftElements.splice(elementIndex, 1);
    }
    return newState;
};
