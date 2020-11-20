import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleDeleteAutoRecloseSuccessAction = (state: LogbookStoreData,
                                                     action: RootActions.DeleteAutoRecloseSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find and remove the auto reclose element
    const elementIndex = newState.currentLogbookData.AutoRecloseData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.AutoRecloseData.splice(elementIndex, 1);
    }
    return newState;
};

export const handleAutoRecloseUpdateSuccessAction = (state: LogbookStoreData,
                                                     action: RootActions.UpdateLogbookAutoRecloseSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.currentLogbookData.AutoRecloseData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.currentLogbookData.AutoRecloseData[elementIndex] = data;
    }
    return newState;
};
