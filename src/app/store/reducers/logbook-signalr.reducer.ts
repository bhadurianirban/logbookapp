import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleGetLogbookAntiTheftSuccess = (state: LogbookStoreData,
                                                 action: RootActions.GetLogbookAntiTheftSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.AntiTheftElements = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};

export const handleGetLogbookAutoRecloseSuccess = (state: LogbookStoreData,
                                                   action: RootActions.GetLogbookAutoRecloseSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.AutoRecloseData = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};
export const handleGetLogbookFirstTimeChargeSuccess = (state: LogbookStoreData,
    action: RootActions.GetLogbookFirstTimeChargeSuccessAction): LogbookStoreData => {
const currentState: LogbookStoreData = cloneDeep(state);
const data = action.payload;
currentState.currentLogbookData.FirstTimeChargeData = data;
currentState.error = null;
currentState.issued = true;
currentState.pending = false;
return currentState;
};

export const handleGetLogbookOutageSuccess = (state: LogbookStoreData,
                                              action: RootActions.GetLogbookOutageSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.OutageElements = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};

export const handleGetLogbookShutdownSuccess = (state: LogbookStoreData,
                                                action: RootActions.GetLogbookShutdownSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.ShutdownElements = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};

export const handleGetLogbookTrippingSuccess = (state: LogbookStoreData,
                                                action: RootActions.GetLogbookTrippingSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.TrippingElements = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};

export const handleGetLogbookRestSuccess = (state: LogbookStoreData,
                                            action: RootActions.GetLogbookRestrictionSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.LoadData = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};

export const handleGetLogbookReleaseSuccess = (state: LogbookStoreData,
                                               action: RootActions.GetLogbookReleaseSuccessAction): LogbookStoreData => {
    const currentState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    currentState.currentLogbookData.LoadReleaseData = data;
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};
