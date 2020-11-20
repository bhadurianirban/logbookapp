import { UserRoleMapActions, UserRoleMapActionUnion } from '../actions/user-role.actions';
import { UserRoleMapStoreData } from '../user-role-map.store';
import { IUserRoleMapView } from 'src/app/user-manage/user-role-map/user-role-map.model';
const defaultState = {
    userRoleMapData: [],
    error: null,
    pending: false,
    issued: false
} as UserRoleMapStoreData;
export function UserRoleReducer(state: UserRoleMapStoreData= defaultState, action: UserRoleMapActionUnion) {
    switch (action.type)
    {
        case UserRoleMapActions.GET_USERROLEMAPPING_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case UserRoleMapActions.GET_USERROLEMAPPING_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        },{ userRoleMapData: action.payload });
        case UserRoleMapActions.GET_USERROLEMAPPING_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });

        case UserRoleMapActions.CREATE_USERROLEMAPPING_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case UserRoleMapActions.CREATE_USERROLEMAPPING_SUCCESS:
        const newState = state.userRoleMapData.concat(action.payload);
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        }, { userRoleMapData: newState });

        case UserRoleMapActions.CREATE_USERROLEMAPPING_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        case UserRoleMapActions.DELETE_USERROLEMAPPING_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case UserRoleMapActions.DELETE_USERROLEMAPPING_SUCCESS: 
        const afterDeletionState = state.userRoleMapData.filter(function(item) {
            return item.Id !== action.payload.Id
          });
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        }, { userRoleMapData: afterDeletionState });

        case UserRoleMapActions.DELETE_USERROLEMAPPING_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        default:
        return state;
    }
}