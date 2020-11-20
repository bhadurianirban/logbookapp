import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';
import { DashboardStore } from '../dashboard.store';

export const handleCreateDashboardCodeSuccessAction = (state: DashboardStore,
                                                       action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const data = action.payload;
    switch (data.Type) {
        case 'Outage':
            return handleOutageDashboardCodeCreateSuccess(state, action);
        case 'AntiTheft':
            return handleAntiTheftDashboardCodeCreateSuccess(state, action);
        case 'Tripping':
            return handleTrippingDashboardCodeCreateSuccess(state, action);
        case 'Shutdown':
            return handleShutdownDashboardCodeCreateSuccess(state, action);
        case 'AutoReclose':
            return handleAutoRecloseDashboardCodeCreateSuccess(state, action);
        case 'FirstTimeCharge':
            return handleFirstTimeChargeDashboardCodeCreateSuccess(state, action);
        default:
            return state;
    }
};

export const handleCancelDashboardCodeSuccessAction = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
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

const handleOutageDashboardCodeCreateSuccess = (state: DashboardStore,
    action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.OutageElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.OutageElements[index].OpeningCode
                    && newState.dashboardData.OutageElements[index].OpeningCode.length > 0) {
                    newState.dashboardData.OutageElements[index].OpeningCode.push(data);
                } else {
                    newState.dashboardData.OutageElements[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.OutageElements[index].OpeningThirdPartyCode
                    && newState.dashboardData.OutageElements[index].OpeningThirdPartyCode.length > 0) {
                    newState.dashboardData.OutageElements[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.OutageElements[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.OutageElements[index].ClosingThirdPartyCode
                    && newState.dashboardData.OutageElements[index].ClosingThirdPartyCode.length > 0) {
                    newState.dashboardData.OutageElements[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.OutageElements[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.OutageElements[index].ClosingCode
                    && newState.dashboardData.OutageElements[index].ClosingCode.length > 0) {
                    newState.dashboardData.OutageElements[index].ClosingCode.push(data);
                } else {
                    newState.dashboardData.OutageElements[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleAutoRecloseDashboardCodeCreateSuccess = (state: DashboardStore,
    action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.AutoRecloseData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.AutoRecloseData[index].OpeningCode
                    && newState.dashboardData.AutoRecloseData[index].OpeningCode.length > 0) {
                    newState.dashboardData.AutoRecloseData[index].OpeningCode.push(data);
                } else {
                    newState.dashboardData.AutoRecloseData[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode
                    && newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode.length > 0) {
                    newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode
                    && newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode.length > 0) {
                    newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.AutoRecloseData[index].ClosingCode
                    && newState.dashboardData.AutoRecloseData[index].ClosingCode.length > 0) {
                    newState.dashboardData.AutoRecloseData[index].ClosingCode.push(data);
                } else {
                    newState.dashboardData.AutoRecloseData[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleFirstTimeChargeDashboardCodeCreateSuccess = (state: DashboardStore,
    action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.FirstTimeChargeData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.FirstTimeChargeData[index].OpeningCode
                    && newState.dashboardData.FirstTimeChargeData[index].OpeningCode.length > 0) {
                    newState.dashboardData.FirstTimeChargeData[index].OpeningCode.push(data);
                } else {
                    newState.dashboardData.FirstTimeChargeData[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode
                    && newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode.length > 0) {
                    newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode
                    && newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode.length > 0) {
                    newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.FirstTimeChargeData[index].ClosingCode
                    && newState.dashboardData.FirstTimeChargeData[index].ClosingCode.length > 0) {
                    newState.dashboardData.FirstTimeChargeData[index].ClosingCode.push(data);
                } else {
                    newState.dashboardData.FirstTimeChargeData[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleAntiTheftDashboardCodeCreateSuccess = (state: DashboardStore,
    action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.AntiTheftElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'AO': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode.length > 0) {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode.push(data);
                } else {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode = [data];
                }
                break;
            }
            case 'AC': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode.length > 0) {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode.push(data);
                } else {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode = [data];
                }
                break;
            }
            case 'ATO': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.length > 0) {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.push(data);
                } else {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode = [data];
                }
                break;
            }
            case 'ATC': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.length > 0) {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.push(data);
                } else {
                    newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleTrippingDashboardCodeCreateSuccess = (state: DashboardStore,
                                                  action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.TrippingElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'TC': {
                if (newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode
                    && newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode.length > 0) {
                    newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.TrippingElements[index].ClosingCode
                    && newState.dashboardData.TrippingElements[index].ClosingCode.length > 0) {
                    newState.dashboardData.TrippingElements[index].ClosingCode.push(data);
                } else {
                    newState.dashboardData.TrippingElements[index].ClosingCode = [data];
                }
                break;
            }
            case 'P': {
                if (newState.dashboardData.TrippingElements[index].PatrolingCode
                    && newState.dashboardData.TrippingElements[index].PatrolingCode.length > 0) {
                    newState.dashboardData.TrippingElements[index].PatrolingCode.push(data);
                } else {
                    newState.dashboardData.TrippingElements[index].PatrolingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleShutdownDashboardCodeCreateSuccess = (state: DashboardStore,
    action: RootActions.CreateDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.ShutdownElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.ShutdownElements[index].OpeningCode
                    && newState.dashboardData.ShutdownElements[index].OpeningCode.length > 0) {
                    newState.dashboardData.ShutdownElements[index].OpeningCode.push(data);
                } else {
                    newState.dashboardData.ShutdownElements[index].OpeningCode = [data];
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode
                    && newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode.length > 0) {
                    newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode = [data];
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode
                    && newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode.length > 0) {
                    newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode.push(data);
                } else {
                    newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode = [data];
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.ShutdownElements[index].ClosingCode
                    && newState.dashboardData.ShutdownElements[index].ClosingCode.length > 0) {
                    newState.dashboardData.ShutdownElements[index].ClosingCode.push(data);
                } else {
                    newState.dashboardData.ShutdownElements[index].ClosingCode = [data];
                }
                break;
            }
        }
    }
    return newState;
};

const handleOutageCodeCancel = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.OutageElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.OutageElements[index].OpeningCode
                    && newState.dashboardData.OutageElements[index].OpeningCode.length > 0) {
                    const codeIndex = newState.dashboardData.OutageElements[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.OutageElements[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.OutageElements[index].OpeningThirdPartyCode
                    && newState.dashboardData.OutageElements[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.OutageElements[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.OutageElements[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.OutageElements[index].ClosingThirdPartyCode
                    && newState.dashboardData.OutageElements[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.OutageElements[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.OutageElements[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.OutageElements[index].ClosingCode
                    && newState.dashboardData.OutageElements[index].ClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.OutageElements[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.OutageElements[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleAutoRecloseCodeCancel = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.AutoRecloseData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.AutoRecloseData[index].OpeningCode
                    && newState.dashboardData.AutoRecloseData[index].OpeningCode.length > 0) {
                    const codeIndex = newState.dashboardData.AutoRecloseData[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AutoRecloseData[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode
                    && newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AutoRecloseData[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode
                    && newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AutoRecloseData[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.AutoRecloseData[index].ClosingCode
                    && newState.dashboardData.AutoRecloseData[index].ClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.AutoRecloseData[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AutoRecloseData[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleFirstTimeChargeCodeCancel = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.FirstTimeChargeData
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.FirstTimeChargeData[index].OpeningCode
                    && newState.dashboardData.FirstTimeChargeData[index].OpeningCode.length > 0) {
                    const codeIndex = newState.dashboardData.FirstTimeChargeData[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.FirstTimeChargeData[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode
                    && newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.FirstTimeChargeData[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode
                    && newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.FirstTimeChargeData[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.FirstTimeChargeData[index].ClosingCode
                    && newState.dashboardData.FirstTimeChargeData[index].ClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.FirstTimeChargeData[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.FirstTimeChargeData[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleAntiTheftCodeCancel = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.AntiTheftElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'AO': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode.length > 0) {
                    const codeIndex = newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AntiTheftElements[index].AntiTheftOpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'AC': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AntiTheftElements[index].AntiTheftClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'ATO': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.length > 0) {
                    const codeIndex = newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyOpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'ATC': {
                if (newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode
                    && newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.AntiTheftElements[index].AntiTheftThirdPartyClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleTrippingCodeCancel = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.TrippingElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'TC': {
                if (newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode
                    && newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.TrippingElements[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.TrippingElements[index].ClosingCode
                    && newState.dashboardData.TrippingElements[index].ClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.TrippingElements[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.TrippingElements[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};

const handleShutdownCodeCancel = (state: DashboardStore,
    action: RootActions.CancelDashboardCodeSuccessAction): DashboardStore => {
    const newState: DashboardStore = cloneDeep(state);
    const data = action.payload;
    const index = newState.dashboardData.ShutdownElements
        .findIndex(x => x.RequestId === data.ElementId && x.LogbookId === data.LogbookId);
    if (index > -1) {
        switch (data.CodeType) {
            case 'O': {
                if (newState.dashboardData.ShutdownElements[index].OpeningCode
                    && newState.dashboardData.ShutdownElements[index].OpeningCode.length > 0) {
                    const codeIndex = newState.dashboardData.ShutdownElements[index].OpeningCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.ShutdownElements[index].OpeningCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TO': {
                if (newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode
                    && newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.ShutdownElements[index].OpeningThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'TC': {
                if (newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode
                    && newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode.length > 0) {
                    const codeIndex = newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.ShutdownElements[index].ClosingThirdPartyCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
            case 'C': {
                if (newState.dashboardData.ShutdownElements[index].ClosingCode
                    && newState.dashboardData.ShutdownElements[index].ClosingCode.length > 0) {
                    const codeIndex = newState.dashboardData.ShutdownElements[index].ClosingCode
                        .findIndex(x => x.CodeId === data.CodeId);
                    if (codeIndex > -1) {
                        newState.dashboardData.ShutdownElements[index].ClosingCode.splice(codeIndex, 1, data);
                    }
                }
                break;
            }
        }
    }
    return newState;
};
