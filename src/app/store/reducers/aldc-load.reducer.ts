import * as RootActions from '../actions/index';
import { ALDCLoadStore, INITIAL_ALDC_LOAD } from '../aldc-load.store';

export function ALDCLoadReducer(state: ALDCLoadStore = INITIAL_ALDC_LOAD,
                                action: RootActions.ALDCLoadActionsUnion) {
    switch (action.type) {
        case RootActions.ALDCLoadActions.GET_ALDC_LOAD_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ALDCLoadActions.GET_ALDC_LOAD_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { aldcLoadData: action.payload  });
        case RootActions.ALDCLoadActions.GET_ALDC_LOAD_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ALDCLoadActions.UPDATE_ALDC_LOAD_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ALDCLoadActions.UPDATE_ALDC_LOAD_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { aldcLoadData: action.payload  });
        case RootActions.ALDCLoadActions.UPDATE_ALDC_LOAD_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ALDCLoadActions.GET_ALDC_GRID_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ALDCLoadActions.GET_ALDC_GRID_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { aldcLoadData: { AllGrids: action.payload  } });
        case RootActions.ALDCLoadActions.GET_ALDC_GRID_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { aldcLoadData: { GridsWithRestriction: action.payload  } });
        case RootActions.ALDCLoadActions.GET_ALDC_GRID_RESTRICTIONS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
