import { UserManagementRepositoryActionUnion, UserManagementRepositoryActions } from '../actions/user-management.actions';
import { UserMasterStoreData } from '../user-master.store';
import { cloneDeep } from 'lodash';

const defaultState = {
    userViewModelData: null,
    error: null,
    pending: false,
    issued: false
} as UserMasterStoreData;

export function UserManagementReducer(state: UserMasterStoreData= defaultState, action: UserManagementRepositoryActionUnion) {
    switch (action.type) {
        case UserManagementRepositoryActions.GET_USERS_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case UserManagementRepositoryActions.GET_USERS_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        },   { userViewModelData: action.payload } );
        case UserManagementRepositoryActions.GET_USERS_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        case UserManagementRepositoryActions.CREATE_USERS_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case UserManagementRepositoryActions.CREATE_USERS_SUCCESS:
            const newState: UserMasterStoreData = cloneDeep(state);
            const existingItemIndex = state.userViewModelData.findIndex((item) => {
                return item.Id === action.payload.Id;
            });
            if (existingItemIndex > -1) {
                newState.userViewModelData.splice(existingItemIndex, 1, action.payload);
            } else {
                newState.userViewModelData.push(action.payload);
            }
            return newState;
        case UserManagementRepositoryActions.CREATE_USERS_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        case UserManagementRepositoryActions.DELETE_USERS_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case UserManagementRepositoryActions.DELETE_USERS_SUCCESS:
        let deletedState = state.userViewModelData.filter(function(item) {
            return item.Id !== action.payload.Id
          });
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        },   { userViewModelData: deletedState } );
        case UserManagementRepositoryActions.DELETE_USERS_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        default:
        return state;
    }
}
