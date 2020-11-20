import { DashboardStore, INITIAL_DASHBOARD } from '../dashboard.store';
import * as RootActions from '../actions/index';
import { DashboardActionsUnion, DashboardActions } from '../actions/index';
import { handleTrippingDashboardUpdateSuccessAction, handleDashboardDeleteTrippingSuccessAction } from './dashboard-tripping.reducer';
import { handleAntiTheftDashboardUpdateSuccessAction, handleDashboardDeleteAntiTheftSuccessAction } from './dashboard-antitheft.reducer';
import { handleCreateDashboardCodeSuccessAction, handleCancelDashboardCodeSuccessAction } from './dashboard-code-reducer';
import { handleOutageDashboardUpdateSuccessAction, handleDashboardOutageDeleteSuccessAction } from './dashboard-outage.reducer';
import { handleDashboardDeferShutdownSuccessAction, handleShutdownDashboardUpdateSuccessAction } from './dashboard-shutdown.reducer';
import { handleFTCDashboardUpdateSuccessAction, handleDashboardDeleteFirstTimeChargeSuccessAction } from './dashboard-first-time-charge.reducer';
import { handleARDashboardUpdateSuccessAction, handleDashboardDeleteAutoRecloseSuccessAction } from './dashboard-autoreclose.reducer';
import { handleGetDashboardStatcomSuccess, handleGetDashboardFscTcscSuccess } from './dashboard-statcom-fsctscc.reducer';
import { handleTieLineDashboardCaptureSuccessAction, handleTieLineDashboardUpdateSuccessAction } from './dashboard-tie-line.reducer';

export function DashboardReducer(state: DashboardStore = INITIAL_DASHBOARD, action: DashboardActionsUnion
    | RootActions.OutageActionsUnion | RootActions.TrippingActionsUnion | RootActions.AntiTheftActionsUnion
    | RootActions.ShutdownRequestActionsUnion | RootActions.CodeRepositoryActionUnion
    | RootActions.AutoRecloseActionsUnion | RootActions.FirstTimeChargeActionsUnion | RootActions.TieLineActionsUnion | RootActions.FscTcscActionsUnion | RootActions.StatcomActionsUnion) {
    switch (action.type) {
        case DashboardActions.GET_DASHBOARD_DATA_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DashboardActions.GET_DASHBOARD_DATA_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { dashboardData: action.payload });
        case DashboardActions.GET_DASHBOARD_DATA_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case DashboardActions.GET_DASHBOARD_SHUTDOWN_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DashboardActions.GET_DASHBOARD_SHUTDOWN_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { dashboardData: { ShutdownElements: action.payload } });
        case DashboardActions.GET_DASHBOARD_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case DashboardActions.GET_DASHBOARD_OUTAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DashboardActions.GET_DASHBOARD_OUTAGE_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { dashboardData: { OutageElements: action.payload } });
        case DashboardActions.GET_DASHBOARD_OUTAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case DashboardActions.GET_DASHBOARD_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DashboardActions.GET_DASHBOARD_TRIPPING_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { dashboardData: { TrippingElements: action.payload } });
        case DashboardActions.GET_DASHBOARD_TRIPPING_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case DashboardActions.GET_DASHBOARD_ANTITHEFT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DashboardActions.GET_DASHBOARD_ANTITHEFT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { dashboardData: { AntiTheftElements: action.payload } });
        case DashboardActions.GET_DASHBOARD_ANTITHEFT_ERROR:
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
        case RootActions.OutageActions.UPDATE_DASHBOARD_OUTAGE_SUCCESS:
            return handleOutageDashboardUpdateSuccessAction(state, action);
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
        case RootActions.OutageActions.DELETE_OUTAGE_SUCCESS:
            return handleDashboardOutageDeleteSuccessAction(state, action);
        case RootActions.OutageActions.DELETE_OUTAGE_ERROR:
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
        case RootActions.AutoRecloseActions.UPDATE_DASHBOARD_AUTO_RECLOSE_SUCCESS:
            return handleARDashboardUpdateSuccessAction(state, action);
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
        case RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_SUCCESS:
            return handleDashboardDeleteAutoRecloseSuccessAction(state, action);
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
        case RootActions.FirstTimeChargeActions.UPDATE_DASHBOARD_FIRST_TIME_CHARGE_SUCCESS:
            return handleFTCDashboardUpdateSuccessAction(state, action);
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
        case RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_SUCCESS:
            return handleDashboardDeleteFirstTimeChargeSuccessAction(state, action);
        case RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.TieLineActions.CAPTURE_TIE_LINE_DATA_SUCCESS:
            return handleTieLineDashboardCaptureSuccessAction(state, action);
        case RootActions.TrippingActions.UPDATE_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.TrippingActions.UPDATE_DASHBOARD_TRIPPING_SUCCESS:
            return handleTrippingDashboardUpdateSuccessAction(state, action);
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
        case RootActions.TrippingActions.DELETE_TRIPPING_SUCCESS:
            return handleDashboardDeleteTrippingSuccessAction(state, action);
        case RootActions.TrippingActions.DELETE_TRIPPING_TRY:
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
        case RootActions.AntiTheftActions.UPDATE_DASHBOARD_ANTITHEFT_SUCCESS:
            return handleAntiTheftDashboardUpdateSuccessAction(state, action);
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
        case RootActions.AntiTheftActions.DELETE_ANTITHEFT_SUCCESS:
            return handleDashboardDeleteAntiTheftSuccessAction(state, action);
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
        case RootActions.ShutdownRequestActions.UPDATE_DASHBOARD_APPROVED_SHUTDOWN_SUCCESS:
            return handleShutdownDashboardUpdateSuccessAction(state, action);
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
        case RootActions.ShutdownRequestActions.DEFER_DASHBOARD_SHUTDOWN_SUCCESS:
            return handleDashboardDeferShutdownSuccessAction(state, action);
        case RootActions.ShutdownRequestActions.DEFER_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.CodeRepositoryActions.CREATE_CODE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.CodeRepositoryActions.CREATE_DASHBOARD_CODE_SUCCESS:
            return handleCreateDashboardCodeSuccessAction(state, action);
        case RootActions.CodeRepositoryActions.CREATE_CODE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.CodeRepositoryActions.CANCEL_CODE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.CodeRepositoryActions.CANCEL_DASHBOARD_CODE_SUCCESS:
            return handleCancelDashboardCodeSuccessAction(state, action);
        case RootActions.CodeRepositoryActions.CANCEL_CODE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.FscTcscActions.GET_FSCTCSC_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.FscTcscActions.GET_DASHBOARD_FSCTCSC_SUCCESS:
            return handleGetDashboardFscTcscSuccess(state, action);
        case RootActions.FscTcscActions.GET_FSCTCSC_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.StatcomActions.GET_STATCOM_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.StatcomActions.GET_DASHBOARD_STATCOM_SUCCESS:
            return handleGetDashboardStatcomSuccess(state, action);
        case RootActions.StatcomActions.GET_STATCOM_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
