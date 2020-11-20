import { IRole } from '../shared/models/role.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface RoleStoreData extends AsyncRequestModel {
    roleData: IRole[];
}
export const INITIAL_ROLE_DATA: RoleStoreData = {
    roleData: [],
    error: null,
    pending: false,
    issued: false
};
