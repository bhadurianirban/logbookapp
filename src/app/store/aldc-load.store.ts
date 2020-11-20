import { AsyncRequestModel } from '../shared/models/async-request.model';
import { LoadViewModel, IALDCLoadModel } from '../shared/models/load-management.model';

export interface ALDCLoadStore extends AsyncRequestModel {
    aldcLoadData: IALDCLoadModel;
}

export const INITIAL_ALDC_LOAD: ALDCLoadStore = {
    aldcLoadData: null,
    error: null,
    pending: false,
    issued: false
};

