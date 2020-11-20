import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';
import { IConstituents } from 'src/app/shared/models/master-data.model';

export const handleDeleteShiftUserSuccess = (state: LogbookStoreData,
                                             action: RootActions.DeleteShiftUserSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.ShiftUsers
            .findIndex(x => x.Id === data);
    if (index > -1) {
        newState.currentLogbookData.ShiftUsers.splice(index, 1);
    }
    return newState;
};

export const handleAddShiftUserSuccess = (state: LogbookStoreData,
                                          action: RootActions.AddShiftUserSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    if (newState.currentLogbookData.ShiftUsers && newState.currentLogbookData.ShiftUsers.length > 0) {
        newState.currentLogbookData.ShiftUsers.push(data);
    } else {
        newState.currentLogbookData.ShiftUsers = [data];
    }
    return newState;
};

export const handleUpdateShiftInchargeSuccess = (state: LogbookStoreData,
                                                 action: RootActions.UpdateShiftInchargeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    newState.currentLogbookData.ShiftIncharge = data.Id;
    return newState;
};

export const handleConfirmShiftUserSuccess = (state: LogbookStoreData,
                                              action: RootActions.ConfirmShiftUserSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    newState.currentLogbookData.ShiftConfirmation = data;
    return newState;
};

export const handleUpdateShiftHanoverSuccess = (state: LogbookStoreData,
                                                action: RootActions.UpdateShiftHandoverSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    newState.currentLogbookData.ShiftHandover = data;
    return newState;
};

export const handleAddInstructionSuccessAction =
 (state: LogbookStoreData, action: RootActions.AddInstructionSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.currentLogbookData.Instructions
                && currentState.currentLogbookData.Instructions.length > 0) {
        currentState.currentLogbookData.Instructions.push(data);
    } else {
        currentState.currentLogbookData.Instructions = [data];
    }
    return currentState;
};

export const handleAddLoadSuccessAction =
 (state: LogbookStoreData, action: RootActions.AddLogbookLoadSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (data.Type === 'LR') {
        if (currentState.currentLogbookData.LoadData
            && currentState.currentLogbookData.LoadData.length > 0) {
            currentState.currentLogbookData.LoadData.push(data);
        } else {
            currentState.currentLogbookData.LoadData = [data];
        }
    } else {
        if (currentState.currentLogbookData.LoadReleaseData
            && currentState.currentLogbookData.LoadReleaseData.length > 0) {
            currentState.currentLogbookData.LoadReleaseData.push(data);
        } else {
            currentState.currentLogbookData.LoadReleaseData = [data];
        }
    }
    return currentState;
};

export const handleUpdateLoadSuccessAction =
 (state: LogbookStoreData, action: RootActions.UpdateLogbookLoadSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    // find current element
    if (data.Type === 'LR') {
        const elementIndex = currentState.currentLogbookData.LoadData.findIndex(x => x.RequestId === data.RequestId);
        if (elementIndex > -1) {
            currentState.currentLogbookData.LoadData[elementIndex] = data;
        }
    } else {
        const elementIndex = currentState.currentLogbookData.LoadReleaseData.findIndex(x => x.RequestId === data.RequestId);
        if (elementIndex > -1) {
            currentState.currentLogbookData.LoadReleaseData[elementIndex] = data;
        }
    }
    return currentState;
};

export const handleAddIssueSuccessAction = (state: LogbookStoreData, action: RootActions.AddIssueSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.currentLogbookData.Issues
                && currentState.currentLogbookData.Issues.length > 0) {
        currentState.currentLogbookData.Issues.push(data);
    } else {
        currentState.currentLogbookData.Issues = [data];
    }
    return currentState;
};

export const handleDeleteIssueSuccessAction = (state: LogbookStoreData, action: RootActions.DeleteIssueSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.Issues
            .findIndex(x => x.RequestId === data.RequestId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        newState.currentLogbookData.Issues.splice(index, 1);
    }
    return newState;
};

export const handleAddSchedulingSuccessAction = (state: LogbookStoreData,
                                                 action: RootActions.AddSchedulingSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.currentLogbookData.SchedulingDetails
                && currentState.currentLogbookData.SchedulingDetails.length > 0) {
        currentState.currentLogbookData.SchedulingDetails.push(data);
    } else {
        currentState.currentLogbookData.SchedulingDetails = [data];
    }
    return currentState;
};

export const handleDeleteSchedulingSuccessAction = (state: LogbookStoreData,
                                                    action: RootActions.DeleteSchedulingSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.SchedulingDetails
            .findIndex(x => x.RequestId === data.RequestId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        newState.currentLogbookData.SchedulingDetails.splice(index, 1);
    }
    return newState;
};

export const handleAddViolationMessageSuccess = (state: LogbookStoreData,
                                                 action: RootActions.AddViolationMessageSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.currentLogbookData.ViolationMessages
                && currentState.currentLogbookData.ViolationMessages.length > 0) {
        currentState.currentLogbookData.ViolationMessages.push(data);
    } else {
        currentState.currentLogbookData.ViolationMessages = [data];
    }
    return currentState;
};

export const handleUpdateMessageAction = (state: LogbookStoreData,
                                          action: RootActions.UpdateViolationMessageSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.currentLogbookData.ViolationMessages.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.ViolationMessages[elementIndex] = data;
    }
    return newState;
};

export const handleDeleteMessageSuccess = (state: LogbookStoreData,
                                           action: RootActions.DeleteViolationMessageSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.ViolationMessages
            .findIndex(x => x.RequestId === data.RequestId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        newState.currentLogbookData.ViolationMessages.splice(index, 1);
    }
    return newState;
};

export const handleMessageDownloadSuccess = (state: LogbookStoreData,
                                             action: RootActions.DownloadViolationMessageSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const downloadData = URL.createObjectURL(data);
    window.open(downloadData);
    return state;
};
