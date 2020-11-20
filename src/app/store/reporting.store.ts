import { AsyncRequestModel } from '../shared/models/async-request.model';
import { IReporting } from '../shared/models/reporting.model';

export interface ReportingStore extends AsyncRequestModel {
    reportingData: IReporting;
}

export const INITIAL_REPORTING_DATA: ReportingStore = {
    reportingData: null,
    error: null,
    pending: false,
    issued: false
};
