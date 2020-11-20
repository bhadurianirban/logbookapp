import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleShutdownUpdateSuccessAction = (state: LogbookStoreData,
                                                  action: RootActions.UpdateLogbookApprovedShutdownSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.currentLogbookData.ShutdownElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.ShutdownElements[elementIndex] = data;
    }
    return newState;
};

export const handleDeferShutdownSuccessAction = (state: LogbookStoreData,
                                                 action: RootActions.DeferLogbookShutdownSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.currentLogbookData.ShutdownElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.ShutdownElements.splice(elementIndex, 1);
    }
    return newState;
};

export const handleRefreshShutdownSuccess = (state: LogbookStoreData,
                                             action: RootActions.RefreshShutdownSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    if (data && data.length > 0) {
        newState.currentLogbookData.ShutdownElements.push(...data);
    }
    return newState;
};
