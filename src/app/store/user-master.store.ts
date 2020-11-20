import { IUserViewModelInterface } from '../shared/models/user-management.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface UserMasterStoreData extends AsyncRequestModel {
    userViewModelData: IUserViewModelInterface[];
}
export const INITIAL_USER_MASTER_DATA: UserMasterStoreData = {
    userViewModelData: [],
    error: null,
    pending: false,
    issued: false
};
