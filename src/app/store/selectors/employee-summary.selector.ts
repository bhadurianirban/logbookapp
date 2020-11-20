import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { EmployeeSummaryStore } from '../employee-summary.store';

export const employeeSummarySelectFeature = (state: ApplicationState) => state.summary;

export const selectEmployeeSummaryRepository =
 createSelector(employeeSummarySelectFeature, (state: EmployeeSummaryStore) => state.summaryData);
