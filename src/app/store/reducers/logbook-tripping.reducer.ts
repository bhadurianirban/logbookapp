import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleTrippingUpdateSuccessAction = (state: LogbookStoreData,
                                                  action: RootActions.UpdateLogbookTrippingSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the tripping element
    const elementIndex = newState.currentLogbookData.TrippingElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.TrippingElements[elementIndex] = data;
    }
    return newState;
};

export const handleDeleteTrippingSuccessAction = (state: LogbookStoreData,
                                                  action: RootActions.DeleteTrippingSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find and remove the tripping element
    const elementIndex = newState.currentLogbookData.TrippingElements.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.TrippingElements.splice(elementIndex, 1);
    }
    return newState;
};
