import { IRoasterGroup } from '../shared/models/roaster-group.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface RoasterGroupStoreData extends AsyncRequestModel {
    roasterGroupData: IRoasterGroup[];
}
export const INITIAL_ROASTERGROUP_DATA: RoasterGroupStoreData = {
    roasterGroupData: [],
    error: null,
    pending: false,
    issued: false
};
