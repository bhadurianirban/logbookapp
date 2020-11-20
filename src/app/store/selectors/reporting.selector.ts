import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { ReportingStore } from '../reporting.store';

export const reportingSelectFeature = (state: ApplicationState) => state.reportingStoreData;
export const selectReportData =
 createSelector(reportingSelectFeature, (state: ReportingStore) => state.reportingData);
