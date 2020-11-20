import { UserStoreData } from '../user.store';
import * as RootActions from '../actions/index';
import { UserAuthActions } from '../actions';

const defaultState = {
    currentUser: null,
    isAuthenticated: false,
    error: null,
    pending: false,
    issued: false
} as UserStoreData;

export function UserAuthReducer(state: UserStoreData = defaultState, action: RootActions.UserLoginActionsUnion) {
    switch (action.type) {
        case RootActions.UserAuthActions.GET_LOGGED_IN_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.UserAuthActions.GET_LOGGED_IN_USER_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { currentUser: action.payload }, { isAuthenticated: true });
        case RootActions.UserAuthActions.GET_LOGGED_IN_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            }, { currentUser: null });
        default:
            return state;
    }
}
