import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleDeleteOutageSuccessAction = (state: LogbookStoreData,
                                                action: RootActions.DeleteOutageSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.currentLogbookData.OutageElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.OutageElements.splice(elementIndex, 1);
    }
    return newState;
};

export const handleOutageUpdateSuccessAction = (state: LogbookStoreData,
                                                action: RootActions.UpdateLogbookOutageSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.currentLogbookData.OutageElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.OutageElements[elementIndex] = data;
    }
    return newState;
};
