import { IDesignation } from '../shared/models/designation.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface DesignationStoreData extends AsyncRequestModel
{
    designationData: IDesignation[];
}
export const INITIAL_DESIGNATION_DATA: DesignationStoreData = {
    designationData: [],
    error: null,
    pending: false,
    issued: false
};