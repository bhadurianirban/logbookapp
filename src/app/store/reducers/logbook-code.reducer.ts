import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleLogbookCodesSuccess = (state: LogbookStoreData,
    action: RootActions.GetLogbookCodesSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const newState: LogbookStoreData = cloneDeep(state);
    newState.currentLogbookData.ShiftCodes = data;
    return newState;
};

export const handleLoadCodeSuccessAction = (state: LogbookStoreData, action: RootActions.CreateLoadCodeSuccessAction): LogbookStoreData => {
    return handleLoadManagementCodeCreateSuccess(state, action);
};

export const handleCreateLogbookCodeSuccessAction = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const data = action.payload;
    switch (data.Type) {
        case 'Outage':
            return handleOutageLogbookCodeCreateSuccess(state, action);
        case 'AntiTheft':
            return handleAntiTheftLogbookCodeCreateSuccess(state, action);
        case 'Tripping':
            return handleTrippingLogbookCodeCreateSuccess(state, action);
        case 'Shutdown':
            return handleShutdownLogbookCodeCreateSuccess(state, action);
        case 'AutoReclose':
            return handleAutoRecloseLogbookCodeCreateSuccess(state, action);
        case 'FirstTimeCharge':
            return handleFirstTimeChargeLogbookCodeCreateSuccess(state, action);
        default:
            return state;
    }
};

export const handleCancelLogbookCodeSuccessAction = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const data = action.payload;
    switch (data.Type) {
        case 'Outage':
            return handleOutageCodeCancel(state, action);
        case 'AntiTheft':
            return handleAntiTheftCodeCancel(state, action);
        case 'Tripping':
            return handleTrippingCodeCancel(state, action);
        case 'Shutdown':
            return handleShutdownCodeCancel(state, action);
        case 'AutoReclose':
            return handleAutoRecloseCodeCancel(state, action);
        case 'FirstTimeCharge':
            return handleFirstTimeChargeCodeCancel(state, action);
        default:
            return state;
    }
};

const handleOutageLogbookCodeCreateSuccess = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.OutageElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.OutageElements[index].OpeningCode
                    && newState.currentLogbookData.OutageElements[index].OpeningCode.length > 0) {
                    newState.currentLogbookData.OutageElements[index].OpeningCode.push(data);
                } else {
                    newState.currentLogbookData.OutageElements[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode.length > 0) {
                    newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode.length > 0) {
                    newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.OutageElements[index].ClosingCode
                    && newState.currentLogbookData.OutageElements[index].ClosingCode.length > 0) {
                    newState.currentLogbookData.OutageElements[index].ClosingCode.push(data);
                } else {
                    newState.currentLogbookData.OutageElements[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleAutoRecloseLogbookCodeCreateSuccess = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.AutoRecloseData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.AutoRecloseData[index].OpeningCode
                    && newState.currentLogbookData.AutoRecloseData[index].OpeningCode.length > 0) {
                    newState.currentLogbookData.AutoRecloseData[index].OpeningCode.push(data);
                } else {
                    newState.currentLogbookData.AutoRecloseData[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode.length > 0) {
                    newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode.length > 0) {
                    newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.AutoRecloseData[index].ClosingCode
                    && newState.currentLogbookData.AutoRecloseData[index].ClosingCode.length > 0) {
                    newState.currentLogbookData.AutoRecloseData[index].ClosingCode.push(data);
                } else {
                    newState.currentLogbookData.AutoRecloseData[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleLoadManagementCodeCreateSuccess = (state: LogbookStoreData,
                                               action: RootActions.CreateLoadCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    if (data.CodeType === 'LR') {
        const index = newState.currentLogbookData.LoadData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
        if (index > -1) {
            newState.currentLogbookData.LoadData[index].Code = data;
        }
    } else {
        const index = newState.currentLogbookData.LoadReleaseData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
        if (index > -1) {
            newState.currentLogbookData.LoadReleaseData[index].Code = data;
        }
    }
    return newState;
};

const handleFirstTimeChargeLogbookCodeCreateSuccess = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.FirstTimeChargeData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode.length > 0) {
                    newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode.push(data);
                } else {
                    newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode.length > 0) {
                    newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode.length > 0) {
                    newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode.length > 0) {
                    newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode.push(data);
                } else {
                    newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleAntiTheftLogbookCodeCreateSuccess = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.AntiTheftElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'AO': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode.length > 0) {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode.push(data);
                } else {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode = [data];
                }
                break;
            }
            case 'AC': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode.length > 0) {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode.push(data);
                } else {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode = [data];
                }
                break;
            }
            case 'ATO': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.length > 0) {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.push(data);
                } else {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode = [data];
                }
                break;
            }
            case 'ATC': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.length > 0) {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.push(data);
                } else {
                    newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleTrippingLogbookCodeCreateSuccess = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.TrippingElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'TC': {
                if (newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode.length > 0) {
                    newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.TrippingElements[index].ClosingCode
                    && newState.currentLogbookData.TrippingElements[index].ClosingCode.length > 0) {
                    newState.currentLogbookData.TrippingElements[index].ClosingCode.push(data);
                } else {
                    newState.currentLogbookData.TrippingElements[index].ClosingCode = [data];
                }
                break;
            }
            case 'P': {
                if (newState.currentLogbookData.TrippingElements[index].PatrolingCode
                    && newState.currentLogbookData.TrippingElements[index].PatrolingCode.length > 0) {
                    newState.currentLogbookData.TrippingElements[index].PatrolingCode.push(data);
                } else {
                    newState.currentLogbookData.TrippingElements[index].PatrolingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleShutdownLogbookCodeCreateSuccess = (state: LogbookStoreData,
    action: RootActions.CreateLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.ShutdownElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.ShutdownElements[index].OpeningCode
                    && newState.currentLogbookData.ShutdownElements[index].OpeningCode.length > 0) {
                    newState.currentLogbookData.ShutdownElements[index].OpeningCode.push(data);
                } else {
                    newState.currentLogbookData.ShutdownElements[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode.length > 0) {
                    newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode.length > 0) {
                    newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.ShutdownElements[index].ClosingCode
                    && newState.currentLogbookData.ShutdownElements[index].ClosingCode.length > 0) {
                    newState.currentLogbookData.ShutdownElements[index].ClosingCode.push(data);
                } else {
                    newState.currentLogbookData.ShutdownElements[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleOutageCodeCancel = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.OutageElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.OutageElements[index].OpeningCode
                    && newState.currentLogbookData.OutageElements[index].OpeningCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.OutageElements[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.OutageElements[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.OutageElements[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.OutageElements[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.OutageElements[index].ClosingCode
                    && newState.currentLogbookData.OutageElements[index].ClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.OutageElements[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.OutageElements[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleAutoRecloseCodeCancel = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.AutoRecloseData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.AutoRecloseData[index].OpeningCode
                    && newState.currentLogbookData.AutoRecloseData[index].OpeningCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AutoRecloseData[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AutoRecloseData[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AutoRecloseData[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AutoRecloseData[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.AutoRecloseData[index].ClosingCode
                    && newState.currentLogbookData.AutoRecloseData[index].ClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AutoRecloseData[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AutoRecloseData[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleFirstTimeChargeCodeCancel = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.FirstTimeChargeData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.FirstTimeChargeData[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.FirstTimeChargeData[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.FirstTimeChargeData[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode
                    && newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.FirstTimeChargeData[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleAntiTheftCodeCancel = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.AntiTheftElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'AO': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AntiTheftElements[index].AntiTheftOpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'AC': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AntiTheftElements[index].AntiTheftClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'ATO': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'ATC': {
                if (newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode
                    && newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleTrippingCodeCancel = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.TrippingElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'TC': {
                if (newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.TrippingElements[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.TrippingElements[index].ClosingCode
                    && newState.currentLogbookData.TrippingElements[index].ClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.TrippingElements[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.TrippingElements[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleShutdownCodeCancel = (state: LogbookStoreData,
    action: RootActions.CancelLogbookCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const index = newState.currentLogbookData.ShutdownElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.currentLogbookData.ShutdownElements[index].OpeningCode
                    && newState.currentLogbookData.ShutdownElements[index].OpeningCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.ShutdownElements[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.ShutdownElements[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode
                    && newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.ShutdownElements[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode
                    && newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.ShutdownElements[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.currentLogbookData.ShutdownElements[index].ClosingCode
                    && newState.currentLogbookData.ShutdownElements[index].ClosingCode.length > 0) {
                    const codeIndex = newState.currentLogbookData.ShutdownElements[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.currentLogbookData.ShutdownElements[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

export const handlePCOCodeCreationSuccess = (state: LogbookStoreData, action: RootActions.AddPCOCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    if (newState.currentLogbookData && newState.currentLogbookData.PowerChangeOverData
         && newState.currentLogbookData.PowerChangeOverData.length > 0) {
            newState.currentLogbookData.PowerChangeOverData.push(data);
    } else {
        newState.currentLogbookData.PowerChangeOverData = [data];
    }
    return newState;
};

export const handlePCODataUpdateSuccess = (state: LogbookStoreData, action: RootActions.UpdatePCODataSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const elementIndex = newState.currentLogbookData.PowerChangeOverData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.PowerChangeOverData[elementIndex] = data;
    }
    return newState;
};

export const handlePCOCodeCancelSuccess = (state: LogbookStoreData, action: RootActions.CancelPCOCodeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    const elementIndex = newState.currentLogbookData.PowerChangeOverData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.PowerChangeOverData[elementIndex] = data;
    }
    return newState;
};


