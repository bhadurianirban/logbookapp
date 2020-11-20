import { RoleRepositoryActionUnion, RoleRepositoryActions } from '../actions/role.actions';
import { RoleStoreData } from '../role.store';
const defaultState = {
    roleData: null,
    error: null,
    pending: false,
    issued: false
} as RoleStoreData;

export function RoleReducer(state: RoleStoreData = defaultState, action: RoleRepositoryActionUnion) {
    switch (action.type) {
        case RoleRepositoryActions.GET_ROLES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RoleRepositoryActions.GET_ROLES_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { roleData: action.payload });
        case RoleRepositoryActions.GET_ROLES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            default:
            return state;
    }
}
