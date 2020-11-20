import { DutyRoasterActions, DutyRoasterActionUnion } from '../actions/duty-roaster.actions';
import { DutyRoasterStoreData } from '../duty-roaster.store';
import { saveAs } from 'file-saver';
const defaultState = {
    dutyRoasterData: null,
    error: null,
    pending: false,
    issued: false
} as DutyRoasterStoreData;

export function DutyRoasterReducer(state: DutyRoasterStoreData = defaultState, action: DutyRoasterActionUnion) {
    switch (action.type) {
        case DutyRoasterActions.GET_ROASTER_CONFIG_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DutyRoasterActions.GET_ROASTER_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            }, { dutyRoasterData: action.payload });
        case DutyRoasterActions.GET_ROASTER_CONFIG_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        case DutyRoasterActions.CREATE_ROASTER_CONFIG_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DutyRoasterActions.CREATE_ROASTER_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            }, { dutyRoasterData: action.payload });
        case DutyRoasterActions.CREATE_ROASTER_CONFIG_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        case DutyRoasterActions.RPT_ROASTER_CONFIG_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DutyRoasterActions.RPT_ROASTER_CONFIG_SUCCESS:
            saveAs(action.payload.data.body, action.payload.fileName);
            return state;
        case DutyRoasterActions.RPT_ROASTER_CONFIG_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: action.payload
            });
        default:
            return state;
    }
}
