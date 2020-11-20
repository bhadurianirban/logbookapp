import { AsyncRequestModel } from '../shared/models/async-request.model';
import { IEmployeeSummary } from '../shared/models/employee-summary.model';

export interface EmployeeSummaryStore extends AsyncRequestModel {
    summaryData: IEmployeeSummary;
}

export const INITIAL_SUMMARY_DATA: EmployeeSummaryStore = {
    summaryData: null,
    error: null,
    pending: false,
    issued: false
};
