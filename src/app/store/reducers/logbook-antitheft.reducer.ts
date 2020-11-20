import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddAntiTheftSuccess = (state: LogbookStoreData,
                                          action: RootActions.AddAntiTheftSuccessAction): LogbookStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.currentLogbookData.AntiTheftElements
        && currentState.currentLogbookData.AntiTheftElements.length > 0) {
        currentState.currentLogbookData.AntiTheftElements.push(...data);
    } else {
        currentState.currentLogbookData.AntiTheftElements = data;
    }
    currentState.error = null;
    currentState.issued = true;
    currentState.pending = false;
    return currentState;
};

export const handleAntiTheftUpdateSuccessAction = (state: LogbookStoreData,
                                                   action: RootActions.UpdateLogbookAntiTheftSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.currentLogbookData.AntiTheftElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.AntiTheftElements[elementIndex] = data;
    }
    return newState;
};

export const handleDeleteAntiTheftSuccessAction = (state: LogbookStoreData,
                                                   action: RootActions.DeleteAntiTheftSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.currentLogbookData.AntiTheftElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.AntiTheftElements.splice(elementIndex, 1);
    }
    return newState;
};

