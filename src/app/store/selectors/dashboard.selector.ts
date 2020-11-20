import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { DashboardStore } from '../dashboard.store';

export const dasboardSelectFeature = (state: ApplicationState) => state.dashboard;

export const selectDashboardData =
createSelector(dasboardSelectFeature, (state: DashboardStore) => state.dashboardData);
