import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface ReportsStore extends AsyncRequestModel {
    report: any;
}

export const INITIAL_REPORT_REPO: ReportsStore = {
    report: null,
    error: null,
    pending: false,
    issued: false
};
