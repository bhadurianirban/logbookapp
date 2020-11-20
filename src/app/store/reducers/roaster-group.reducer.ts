import { RoasterGroupActions, RoasterGroupActionUnion } from '../actions/roaster-group.actions';
import { RoasterGroupStoreData } from '../roaster-group.store';
const defaultState = {
    roasterGroupData: null,
    error: null,
    pending: false,
    issued: false
} as RoasterGroupStoreData;
export function RoasterGroupReducer(state: RoasterGroupStoreData = defaultState, action: RoasterGroupActionUnion) {
    switch (action.type) {
        case RoasterGroupActions.GET_ROASTER_GROUP_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RoasterGroupActions.GET_ROASTER_GROUP_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            }, { roasterGroupData: action.payload });
        case RoasterGroupActions.GET_ROASTER_GROUP_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        default:
            return state;
    }
}
