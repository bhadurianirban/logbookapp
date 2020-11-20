import { HistoricElementStore, INITIAL_HISTORIC_ELEMENTS } from '../historic-elements.store';
import * as RootActions from '../actions/index';
import { handleHistoricOutageDeleteSuccessAction, handleHistoricOutageUpdateSuccessAction } from './historic-outage.reducer';
import { handleHistoricTrippingUpdateSuccessAction, handleHistoricDeleteTrippingSuccessAction } from './historic-tripping.reducer';
import { handleHistoricAutoRecloseUpdateSuccessAction, handleHistoricDeleteAutoRecloseSuccessAction } from './historic-autoreclose.reducer';
import { handleHistoricFirstTimeChargeUpdateSuccessAction, handleHistoricDeleteFirstTimeChargeSuccessAction } from './historic-firsttimecharge.reducer';
import { handleHistoricAntiTheftUpdateSuccessAction, handleHistoricDeleteAntiTheftSuccessAction } from './historic-antitheft.reducer';
import { handleHistoricShutdownUpdateSuccessAction, handleHistoricDeferShutdownSuccessAction } from './historic-shutdown.reducer';

export function HistoricElementsReducer(state: HistoricElementStore = INITIAL_HISTORIC_ELEMENTS,
                                        action: RootActions.HistoricElementActionsUnion | RootActions.OutageActionsUnion
                                        | RootActions.TrippingActionsUnion | RootActions.AutoRecloseActionsUnion | RootActions.FirstTimeChargeActionsUnion
                                        | RootActions.AntiTheftActionsUnion | RootActions.ShutdownRequestActionsUnion) {
    switch (action.type) {
        case RootActions.HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { historicElementsData: { OutageData: action.payload  } });
        case RootActions.HistoricElementActions.GET_OUTAGE_HISTORY_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { historicElementsData: { AutoRecloseData: action.payload  } });
        case RootActions.HistoricElementActions.GET_AUTORECLOSE_HISTORY_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            
            case RootActions.HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { historicElementsData: { FirstTimeChargeData: action.payload  } });
        case RootActions.HistoricElementActions.GET_FIRSTTIMECHARGE_HISTORY_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });

        case RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { historicElementsData: { AntiTheftData: action.payload  } });
        case RootActions.HistoricElementActions.GET_ANTITHEFT_HISTORY_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { historicElementsData: { ShutdownData: action.payload  } });
        case RootActions.HistoricElementActions.GET_SHUTDOWN_HISTORY_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { historicElementsData: { TrippingData: action.payload  } });
        case RootActions.HistoricElementActions.GET_TRIPPING_HISTORY_ELEMENTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.OutageActions.UPDATE_OUTAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.OutageActions.UPDATE_HISTORY_OUTAGE_SUCCESS:
            return handleHistoricOutageUpdateSuccessAction(state, action);
        case RootActions.OutageActions.UPDATE_OUTAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.OutageActions.DELETE_OUTAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.OutageActions.DELETE_HISTORY_OUTAGE_SUCCESS:
            return handleHistoricOutageDeleteSuccessAction(state, action);
        case RootActions.OutageActions.DELETE_OUTAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.TrippingActions.UPDATE_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.TrippingActions.UPDATE_HISTORY_TRIPPING_SUCCESS:
            return handleHistoricTrippingUpdateSuccessAction(state, action);
        case RootActions.TrippingActions.UPDATE_TRIPPING_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.TrippingActions.DELETE_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.TrippingActions.DELETE_HISTORY_TRIPPING_SUCCESS:
            return handleHistoricDeleteTrippingSuccessAction(state, action);
        case RootActions.TrippingActions.DELETE_TRIPPING_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.AutoRecloseActions.UPDATE_AUTO_RECLOSE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.AutoRecloseActions.UPDATE_HISTORY_AUTO_RECLOSE_SUCCESS:
            return handleHistoricAutoRecloseUpdateSuccessAction(state, action);
        case RootActions.AutoRecloseActions.UPDATE_AUTO_RECLOSE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.AutoRecloseActions.DELETE_HISTOEY_AUTO_RECLOSE_SUCCESS:
            return handleHistoricDeleteAutoRecloseSuccessAction(state, action);
        case RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case RootActions.FirstTimeChargeActions.UPDATE_FIRST_TIME_CHARGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.FirstTimeChargeActions.UPDATE_HISTORY_FIRST_TIME_CHARGE_SUCCESS:
            return handleHistoricFirstTimeChargeUpdateSuccessAction(state, action);
        case RootActions.FirstTimeChargeActions.UPDATE_FIRST_TIME_CHARGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.FirstTimeChargeActions.DELETE_HISTOEY_FIRST_TIME_CHARGE_SUCCESS:
            return handleHistoricDeleteFirstTimeChargeSuccessAction(state, action);
        case RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.AntiTheftActions.UPDATE_ANTITHEFT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.AntiTheftActions.UPDATE_HISTORY_ANTITHEFT_SUCCESS:
            return handleHistoricAntiTheftUpdateSuccessAction(state, action);
        case RootActions.AntiTheftActions.UPDATE_ANTITHEFT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.AntiTheftActions.DELETE_ANTITHEFT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.AntiTheftActions.DELETE_HISTORY_ANTITHEFT_SUCCESS:
            return handleHistoricDeleteAntiTheftSuccessAction(state, action);
        case RootActions.AntiTheftActions.DELETE_ANTITHEFT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShutdownRequestActions.UPDATE_APPROVED_SHUTDOWN_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShutdownRequestActions.UPDATE_HISTORY_APPROVED_SHUTDOWN_SUCCESS:
            return handleHistoricShutdownUpdateSuccessAction(state, action);
        case RootActions.ShutdownRequestActions.UPDATE_APPROVED_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShutdownRequestActions.DEFER_SHUTDOWN_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShutdownRequestActions.DEFER_HISTORY_SHUTDOWN_SUCCESS:
            return handleHistoricDeferShutdownSuccessAction(state, action);
        case RootActions.ShutdownRequestActions.DEFER_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
