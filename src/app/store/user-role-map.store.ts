import { IUserRoleMapView } from '../user-manage/user-role-map/user-role-map.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface UserRoleMapStoreData extends AsyncRequestModel {
    userRoleMapData: IUserRoleMapView[];
}

export const INITIAL_USERROLEMAP_DATA: UserRoleMapStoreData = {
    userRoleMapData: [],
    error: null,
    pending: false,
    issued: false
};

