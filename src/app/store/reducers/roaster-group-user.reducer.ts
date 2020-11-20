import { RoasterGroupUserActions, RoasterGroupUserActionUnion } from '../actions/roaster-group-user.actions';
import { RoasterGroupUserStoreData } from '../roaster-group-user.store';
const defaultState = {
    roasterGroupUserData: null,
    error: null,
    pending: false,
    issued: false
} as RoasterGroupUserStoreData;
export function RoasterGroupUserReducer(state: RoasterGroupUserStoreData = defaultState, action: RoasterGroupUserActionUnion) {
    switch (action.type) {
        case RoasterGroupUserActions.GET_ROASTER_GROUP_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RoasterGroupUserActions.GET_ROASTER_GROUP_USER_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            }, { roasterGroupUserData: action.payload });
        case RoasterGroupUserActions.GET_ROASTER_GROUP_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        case RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            }, { roasterGroupUserData: action.payload });
        case RoasterGroupUserActions.CREATE_ROASTER_GROUP_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
            case RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            }, { roasterGroupUserData: action.payload });
        case RoasterGroupUserActions.DELETE_ROASTER_GROUP_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        default:
            return state;
    }
}
