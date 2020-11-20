import { MasterElementsActionsUnion, MasterElementsActions, SCADADataActionsUnion, SCADADataActions } from '../actions';
import { MasterStoreData } from '../element-master.store';

const defaultState = {
    issued: false,
    pending: false,
    error: null,
    commonMaster: null,
    stateDeviation: null,
    outageMaster: null,
} as MasterStoreData;

export function CommonMasterDataReducer(state: MasterStoreData = defaultState,
                                        action: MasterElementsActionsUnion | SCADADataActionsUnion) {
    switch (action.type) {
        case MasterElementsActions.GET_COMMON_MASTER_DATA_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case MasterElementsActions.GET_COMMON_MASTER_DATA_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { commonMaster: action.payload });
        case MasterElementsActions.GET_COMMON_MASTER_DATA_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case MasterElementsActions.GET_REASON_REMARKS_OPTIONS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case MasterElementsActions.GET_REASON_REMARKS_OPTIONS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { outageMaster: { selectOptions : action.payload }});
        case MasterElementsActions.GET_REASON_REMARKS_OPTIONS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case SCADADataActions.GET_STATE_WISE_DEVIATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SCADADataActions.GET_STATE_WISE_DEVIATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { stateDeviation: { deviation : action.payload }});
        case SCADADataActions.GET_STATE_WISE_DEVIATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
