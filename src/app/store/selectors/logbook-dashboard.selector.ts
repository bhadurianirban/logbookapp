import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { LogbookDashboardStore } from '../logbook-dashboard.store';

export const logbookDasboardSelectFeature = (state: ApplicationState) => state.logbookDashboard;

export const selectLogbookDashboard =
 createSelector(logbookDasboardSelectFeature, (state: LogbookDashboardStore) => state.logbookDashboardData);
