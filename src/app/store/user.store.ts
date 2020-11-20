import { AsyncRequestModel } from '../shared/models/async-request.model';
import { IUserViewModelInterface } from '../shared/models/user-management.model';

export interface UserStoreData extends AsyncRequestModel {
    currentUser: IUserViewModelInterface;
    isAuthenticated: boolean;
}

export const INITIAL_USER_STORE_DATA: UserStoreData = {
    currentUser: null,
    isAuthenticated: false,
    error: null,
    pending: false,
    issued: false
};
