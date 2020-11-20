import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleDeleteFirstTimeChargeSuccessAction = (state: LogbookStoreData,
                                                     action: RootActions.DeleteFirstTimeChargeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find and remove the first time charge element
    const elementIndex = newState.currentLogbookData.FirstTimeChargeData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.FirstTimeChargeData.splice(elementIndex, 1);
    }
    return newState;
};

export const handleFirstTimeChargeUpdateSuccessAction = (state: LogbookStoreData,
                                                     action: RootActions.UpdateLogbookFirstTimeChargeSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.currentLogbookData.FirstTimeChargeData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.FirstTimeChargeData[elementIndex] = data;
    }
    return newState;
};
