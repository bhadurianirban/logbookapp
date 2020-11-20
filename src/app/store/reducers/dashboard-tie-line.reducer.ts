import { DashboardStore } from '../dashboard.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleTieLineDashboardCaptureSuccessAction = (state: DashboardStore,
                                                     action: RootActions.CaptureTieLineSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const currentData = action.payload;
    newState.dashboardData.TieLines =currentData;
    return newState;
};

export const handleTieLineDashboardUpdateSuccessAction = (state: DashboardStore,
                                                              action: RootActions.UpdateTieLineSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the first time charge element
    newState.dashboardData.TieLines =data;
    return newState;
};
