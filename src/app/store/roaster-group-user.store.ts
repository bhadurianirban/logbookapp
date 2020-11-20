import { IRoasterGroupUserViewModel } from '../shared/models/roaster-group-user.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface RoasterGroupUserStoreData extends AsyncRequestModel {
    roasterGroupUserData: IRoasterGroupUserViewModel[];
}
export const INITIAL_ROASTERGROUPUSER_DATA: RoasterGroupUserStoreData = {
    roasterGroupUserData: [],
    error: null,
    pending: false,
    issued: false
};
