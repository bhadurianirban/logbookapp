import { MasterElementsStoreData } from '../element-master.store';
import { MasterElementsActionsUnion, MasterElementsActions } from '../actions';

const defaultState = {
    issued: false,
    pending: false,
    error: null,
    masterElements: null,
} as MasterElementsStoreData;

export function MasterElementsReducer(state: MasterElementsStoreData = defaultState,
                                      action: MasterElementsActionsUnion) {
    switch (action.type) {
        case MasterElementsActions.GET_MASTER_ELEMENTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case MasterElementsActions.GET_MASTER_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { masterElements: action.payload });
        case MasterElementsActions.GET_MASTER_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
