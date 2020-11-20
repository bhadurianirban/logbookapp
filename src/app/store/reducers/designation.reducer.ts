import { DesignationRepositoryActions, DesignationRepositoryActionsUnion } from '../actions/designation.actions';
import { DesignationStoreData } from '../designation.store';
const defaultState = {
    designationData: null,
    error: null,
    pending: false,
    issued: false
} as DesignationStoreData;
export function DesignationReducer(state: DesignationStoreData = defaultState, action: DesignationRepositoryActionsUnion) {
    switch(action.type)
    {
        case DesignationRepositoryActions.GET_DESIGNATIONS_TRY:
        return Object.assign({}, state, {
            issued: true,
            pending: true,
            error: null
        });
        case DesignationRepositoryActions.GET_DESIGNATIONS_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        },{ designationData: action.payload });
        case DesignationRepositoryActions.GET_DESIGNATIONS_ERROR:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        default:
        return state;
    }
}