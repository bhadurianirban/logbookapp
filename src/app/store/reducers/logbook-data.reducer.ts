import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';
import { handleAddIssueSuccessAction, handleDeleteIssueSuccessAction,
     handleAddSchedulingSuccessAction, handleDeleteSchedulingSuccessAction,
      handleAddViolationMessageSuccess, handleUpdateMessageAction,
       handleDeleteMessageSuccess, handleMessageDownloadSuccess,
        handleDeleteShiftUserSuccess, handleAddShiftUserSuccess,
         handleUpdateShiftInchargeSuccess, handleUpdateShiftHanoverSuccess,
          handleConfirmShiftUserSuccess, handleAddInstructionSuccessAction,
           handleAddLoadSuccessAction, handleUpdateLoadSuccessAction } from './logbook-helper.reducer';
import { handleTrippingUpdateSuccessAction, handleDeleteTrippingSuccessAction } from './logbook-tripping.reducer';
import { handleOutageUpdateSuccessAction, handleDeleteOutageSuccessAction } from './logbook-outage.reducer';
import { handleAddAntiTheftSuccess, handleAntiTheftUpdateSuccessAction,
     handleDeleteAntiTheftSuccessAction } from './logbook-antitheft.reducer';
import { handleShutdownUpdateSuccessAction, handleDeferShutdownSuccessAction,
     handleRefreshShutdownSuccess } from './logbook-shutdown.reducer';
import { handleCreateLogbookCodeSuccessAction, handleCancelLogbookCodeSuccessAction,
     handleLogbookCodesSuccess,
     handleLoadCodeSuccessAction, handlePCOCodeCreationSuccess, handlePCODataUpdateSuccess,
      handlePCOCodeCancelSuccess} from './logbook-code.reducer';
import { handleAutoRecloseUpdateSuccessAction, handleDeleteAutoRecloseSuccessAction } from './logbook-auto-reclose.reducer';
import { handleFirstTimeChargeUpdateSuccessAction, handleDeleteFirstTimeChargeSuccessAction } from './logbook-first-time-charge.reducer';
import { handleGetFscTcscSuccess, handleGetStatcomSuccess } from './logbook-statcom-fsctcsc.reducer';
import { handleGetLogbookAntiTheftSuccess, handleGetLogbookAutoRecloseSuccess, handleGetLogbookFirstTimeChargeSuccess,
     handleGetLogbookOutageSuccess, handleGetLogbookShutdownSuccess,
      handleGetLogbookTrippingSuccess, handleGetLogbookRestSuccess, handleGetLogbookReleaseSuccess } from './logbook-signalr.reducer';
import { Logbook, LOGBOOK_INITIAL_DATA } from 'src/app/shared/models/logbook.model';

const defaultState = {
    currentLogbookData: null,
    error: null,
    pending: false,
    issued: false
} as LogbookStoreData;

export function LogbookReducer(state: LogbookStoreData = defaultState,
                               action: RootActions.LogbookActionsUnion
                               | RootActions.OutageActionsUnion | RootActions.TrippingActionsUnion
                               | RootActions.ShutdownRequestActionsUnion | RootActions.LogbookIssueActionsUnion
                               | RootActions.LogbookSchedulingActionsUnion | RootActions.CodeRepositoryActionUnion
                               | RootActions.LogbookViolationMessageActionsUnion | RootActions.AntiTheftActionsUnion
                               | RootActions.ShiftUserActionsUnion | RootActions.AutoRecloseActionsUnion
                               | RootActions.FirstTimeChargeActionsUnion | RootActions.LogbookLoadActionsUnion
                               | RootActions.StatcomActionsUnion | RootActions.FscTcscActionsUnion
                               | RootActions.InstructionActionsUnion | RootActions.PCOActionsUnion) {
    switch (action.type) {
        case RootActions.LogBookActions.CREATE_LOGBOOK_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.CREATE_LOGBOOK_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { currentLogbookData: action.payload });
        case RootActions.LogBookActions.CREATE_LOGBOOK_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.CREATE_LOGBOOK_TRY:
            const newClearState: LogbookStoreData = cloneDeep(state);
            newClearState.currentLogbookData = LOGBOOK_INITIAL_DATA;
            return newClearState;
        case RootActions.LogBookActions.SUBMIT_LOGBOOK_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.SUBMIT_LOGBOOK_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { currentLogbookData: { Status: 'Submitted'} });
        case RootActions.LogBookActions.SUBMIT_LOGBOOK_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.UPDATE_LOGBOOK_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.UPDATE_LOGBOOK_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { currentLogbookData: action.payload });
        case RootActions.LogBookActions.UPDATE_LOGBOOK_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.LOAD_LOGBOOK_DETAIL_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.LOAD_LOGBOOK_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { currentLogbookData: action.payload });
        case RootActions.LogBookActions.LOAD_LOGBOOK_DETAILS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.InstructionActions.ADD_INSTRUCTION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.InstructionActions.ADD_INSTRUCTION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.InstructionActions.ADD_INSTRUCTION_SUCCESS:
            return handleAddInstructionSuccessAction(state, action);
        case RootActions.IssueActions.ADD_ISSUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.IssueActions.ADD_ISSUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.IssueActions.ADD_ISSUE_SUCCESS:
            return handleAddIssueSuccessAction(state, action);
        case RootActions.IssueActions.DELETE_ISSUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.IssueActions.DELETE_ISSUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.IssueActions.DELETE_ISSUE_SUCCESS:
            return handleDeleteIssueSuccessAction(state, action);
        case RootActions.SchedulingActions.ADD_SCHEDULING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.SchedulingActions.ADD_SCHEDULING_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.SchedulingActions.ADD_SCHEDULING_SUCCESS:
            return handleAddSchedulingSuccessAction(state, action);
        case RootActions.SchedulingActions.DELETE_SCHEDULING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.SchedulingActions.DELETE_SCHEDULING_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.SchedulingActions.DELETE_SCHEDULING_SUCCESS:
            return handleDeleteSchedulingSuccessAction(state, action);
        case RootActions.TrippingActions.ADD_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.TrippingActions.ADD_TRIPPING_SUCCESS:
            const trippingData = action.payload;
            const currentAppState = cloneDeep(state);
            if (currentAppState.currentLogbookData.TrippingElements
                && currentAppState.currentLogbookData.TrippingElements.length > 0) {
                    currentAppState.currentLogbookData.TrippingElements.push(...trippingData);
            } else {
                currentAppState.currentLogbookData.TrippingElements = trippingData;
            }
            currentAppState.error = null;
            currentAppState.issued = true;
            currentAppState.pending = false;
            return currentAppState;
        case RootActions.TrippingActions.ADD_TRIPPING_ERROR:
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
        case RootActions.TrippingActions.UPDATE_LOGBOOK_TRIPPING_SUCCESS:
            return handleTrippingUpdateSuccessAction(state, action);
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
            return handleDeleteTrippingSuccessAction(state, action);
        case RootActions.TrippingActions.DELETE_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.OutageActions.ADD_OUTAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.OutageActions.ADD_OUTAGE_SUCCESS:
            const data = action.payload;
            const currentState = cloneDeep(state);
            if (currentState.currentLogbookData.OutageElements
                && currentState.currentLogbookData.OutageElements.length > 0) {
                currentState.currentLogbookData.OutageElements.push(...data);
            } else {
                currentState.currentLogbookData.OutageElements = data;
            }
            currentState.error = null;
            currentState.issued = true;
            currentState.pending = false;
            return currentState;
        case RootActions.OutageActions.ADD_OUTAGE_ERROR:
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
        case RootActions.OutageActions.UPDATE_LOGBOOK_OUTAGE_SUCCESS:
            return handleOutageUpdateSuccessAction(state, action);
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
            return handleDeleteOutageSuccessAction(state, action);
        case RootActions.OutageActions.DELETE_OUTAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.AutoRecloseActions.ADD_AUTO_RECLOSE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.AutoRecloseActions.ADD_AUTO_RECLOSE_SUCCESS:
            const recloseData = action.payload;
            const currentRecloseState = cloneDeep(state);
            if (currentRecloseState.currentLogbookData.AutoRecloseData
                && currentRecloseState.currentLogbookData.AutoRecloseData.length > 0) {
                    currentRecloseState.currentLogbookData.AutoRecloseData.push(...recloseData);
            } else {
                currentRecloseState.currentLogbookData.AutoRecloseData = recloseData;
            }
            currentRecloseState.error = null;
            currentRecloseState.issued = true;
            currentRecloseState.pending = false;
            return currentRecloseState;
        case RootActions.AutoRecloseActions.ADD_AUTO_RECLOSE_ERROR:
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
        case RootActions.AutoRecloseActions.UPDATE_LOGBOOK_AUTO_RECLOSE_SUCCESS:
            return handleAutoRecloseUpdateSuccessAction(state, action);
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
            return handleDeleteAutoRecloseSuccessAction(state, action);
        case RootActions.AutoRecloseActions.DELETE_AUTO_RECLOSE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            // first time charge start
            case RootActions.FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_SUCCESS:
            const firstTimeChargeData = action.payload;
            const currentFirstTimeChargeState = cloneDeep(state);
            if (currentFirstTimeChargeState.currentLogbookData.FirstTimeChargeData
                && currentFirstTimeChargeState.currentLogbookData.FirstTimeChargeData.length > 0) {
                    currentFirstTimeChargeState.currentLogbookData.FirstTimeChargeData.push(...firstTimeChargeData);
            } else {
                currentFirstTimeChargeState.currentLogbookData.FirstTimeChargeData = firstTimeChargeData;
            }
            currentFirstTimeChargeState.error = null;
            currentFirstTimeChargeState.issued = true;
            currentFirstTimeChargeState.pending = false;
            return currentFirstTimeChargeState;
        case RootActions.FirstTimeChargeActions.ADD_FIRST_TIME_CHARGE_ERROR:
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
        case RootActions.FirstTimeChargeActions.UPDATE_LOGBOOK_FIRST_TIME_CHARGE_SUCCESS:
            return handleFirstTimeChargeUpdateSuccessAction(state, action);
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
            return handleDeleteFirstTimeChargeSuccessAction(state, action);
        case RootActions.FirstTimeChargeActions.DELETE_FIRST_TIME_CHARGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            //  first time charge end
        case RootActions.AntiTheftActions.ADD_ANTITHEFT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.AntiTheftActions.ADD_ANTITHEFT_SUCCESS:
            return handleAddAntiTheftSuccess(state, action);
        case RootActions.AntiTheftActions.ADD_ANTITHEFT_ERROR:
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
        case RootActions.AntiTheftActions.UPDATE_LOGBOOK_ANTITHEFT_SUCCESS:
            return handleAntiTheftUpdateSuccessAction(state, action);
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
            return handleDeleteAntiTheftSuccessAction(state, action);
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
        case RootActions.ShutdownRequestActions.UPDATE_LOGBOOK_APPROVED_SHUTDOWN_SUCCESS:
            return handleShutdownUpdateSuccessAction(state, action);
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
        case RootActions.ShutdownRequestActions.DEFER_LOGBBOK_SHUTDOWN_SUCCESS:
            return handleDeferShutdownSuccessAction(state, action);
        case RootActions.ShutdownRequestActions.DEFER_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShutdownRequestActions.REFRESH_SHUTDOWN_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShutdownRequestActions.REFRESH_SHUTDOWN_SUCCESS:
            return handleRefreshShutdownSuccess(state, action);
        case RootActions.ShutdownRequestActions.REFRESH_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ViolationMessageActions.ADD_VIOLATION_MESSAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ViolationMessageActions.ADD_VIOLATION_MESSAGE_SUCCESS:
            return handleAddViolationMessageSuccess(state, action);
        case RootActions.ViolationMessageActions.ADD_VIOLATION_MESSAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_SUCCESS:
            return handleUpdateMessageAction(state, action);
        case RootActions.ViolationMessageActions.UPDATE_VIOLATION_MESSAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ViolationMessageActions.DELETE_VIOLATION_MESSAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ViolationMessageActions.DELETE_VIOLATION_MESSAGE_SUCCESS:
            return handleDeleteMessageSuccess(state, action);
        case RootActions.ViolationMessageActions.DELETE_VIOLATION_MESSAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ViolationMessageActions.MESSAGE_DOWNLOAD_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ViolationMessageActions.MESSAGE_DOWNLOAD_SUCCESS:
            return handleMessageDownloadSuccess(state, action);
        case RootActions.ViolationMessageActions.MESSAGE_DOWNLOAD_ERROR:
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
        case RootActions.CodeRepositoryActions.CREATE_LOGBOOK_CODE_SUCCESS:
            return handleCreateLogbookCodeSuccessAction(state, action);
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

        case RootActions.CodeRepositoryActions.CREATE_LOAD_CODE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.CodeRepositoryActions.CREATE_LOAD_CODE_SUCCESS:
            return handleLoadCodeSuccessAction(state, action);
        case RootActions.CodeRepositoryActions.CREATE_LOAD_CODE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.PCOActions.ADD_PCO_CODE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.PCOActions.ADD_PCO_CODE_SUCCESS:
            return handlePCOCodeCreationSuccess(state, action);
        case RootActions.PCOActions.ADD_PCO_CODE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.PCOActions.UPDATE_PCO_DATA_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.PCOActions.UPDATE_PCO_DATA_SUCCESS:
            return handlePCODataUpdateSuccess(state, action);
        case RootActions.PCOActions.UPDATE_PCO_DATA_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.PCOActions.CANCEL_PCO_CODE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.PCOActions.CANCEL_PCO_CODE_SUCCESS:
            return handlePCOCodeCancelSuccess(state, action);
        case RootActions.PCOActions.CANCEL_PCO_CODE_ERROR:
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
        case RootActions.CodeRepositoryActions.CANCEL_LOGBOOK_CODE_SUCCESS:
            return handleCancelLogbookCodeSuccessAction(state, action);
        case RootActions.CodeRepositoryActions.CANCEL_CODE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShiftUserActions.DELETE_SHIFT_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShiftUserActions.DELETE_SHIFT_USER_SUCCESS:
            return handleDeleteShiftUserSuccess(state, action);
        case RootActions.ShiftUserActions.DELETE_SHIFT_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShiftUserActions.ADD_SHIFT_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShiftUserActions.ADD_SHIFT_USER_SUCCESS:
            return handleAddShiftUserSuccess(state, action);
        case RootActions.ShiftUserActions.ADD_SHIFT_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShiftUserActions.UPDATE_SHIFT_INCHARGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShiftUserActions.UPDATE_SHIFT_INCHARGE_SUCCESS:
            return handleUpdateShiftInchargeSuccess(state, action);
        case RootActions.ShiftUserActions.UPDATE_SHIFT_INCHARGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShiftUserActions.UPDATE_SHIFT_HANDOVER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShiftUserActions.UPDATE_SHIFT_HANDOVER_SUCCESS:
            return handleUpdateShiftHanoverSuccess(state, action);
        case RootActions.ShiftUserActions.UPDATE_SHIFT_HANDOVER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.ShiftUserActions.CONFIRM_SHIFT_USER_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.ShiftUserActions.CONFIRM_SHIFT_USER_SUCCESS:
            return handleConfirmShiftUserSuccess(state, action);
        case RootActions.ShiftUserActions.CONFIRM_SHIFT_USER_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.CodeRepositoryActions.GET_LOGBOK_CODES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.CodeRepositoryActions.GET_LOGBOK_CODES_SUCCESS:
            return handleLogbookCodesSuccess(state, action);
        case RootActions.CodeRepositoryActions.GET_LOGBOK_CODES_ERROR:
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
        case RootActions.FscTcscActions.GET_FSCTCSC_SUCCESS:
            return handleGetFscTcscSuccess(state, action);
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
        case RootActions.StatcomActions.GET_STATCOM_SUCCESS:
            return handleGetStatcomSuccess(state, action);
        case RootActions.StatcomActions.GET_STATCOM_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.GET_LOGBOOK_ANTITHEFT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_ANTITHEFT_SUCCESS:
            return handleGetLogbookAntiTheftSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_ANTITHEFT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.GET_LOGBOOK_AUTORECLOSE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_AUTORECLOSE_SUCCESS:
            return handleGetLogbookAutoRecloseSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_AUTORECLOSE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            //  first time charge start
        case RootActions.LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_SUCCESS:
            return handleGetLogbookFirstTimeChargeSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_FIRSTTIMECHARGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            // first time charge end
        case RootActions.LogBookActions.GET_LOGBOOK_OUTAGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_OUTAGE_SUCCESS:
            return handleGetLogbookOutageSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_OUTAGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.GET_LOGBOOK_SHUTDOWN_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_SHUTDOWN_SUCCESS:
            return handleGetLogbookShutdownSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_SHUTDOWN_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.GET_LOGBOOK_TRIPPING_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_TRIPPING_SUCCESS:
            return handleGetLogbookTrippingSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_TRIPPING_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LoadManagementActions.ADD_LOGBOOK_LOAD_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LoadManagementActions.ADD_LOGBOOK_LOAD_SUCCESS:
            return handleAddLoadSuccessAction(state, action);
        case RootActions.LoadManagementActions.ADD_LOGBOOK_LOAD_FAIL:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LoadManagementActions.UPDATE_LOGBOOK_LOAD_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LoadManagementActions.UPDATE_LOGBOOK_LOAD_SUCCESS:
            return handleUpdateLoadSuccessAction(state, action);
        case RootActions.LoadManagementActions.UPDATE_LOGBOOK_LOAD_FAIL:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.GET_LOGBOOK_RESTRICTION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_RESTRICTION_SUCCESS:
            return handleGetLogbookRestSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_RESTRICTION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case RootActions.LogBookActions.GET_LOGBOOK_RELEASE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case RootActions.LogBookActions.GET_LOGBOOK_RELEASE_SUCCESS:
            return handleGetLogbookReleaseSuccess(state, action);
        case RootActions.LogBookActions.GET_LOGBOOK_RELEASE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}


