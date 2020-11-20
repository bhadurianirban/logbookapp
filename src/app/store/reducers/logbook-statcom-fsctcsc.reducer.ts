import { LogbookStoreData } from '../logbook.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleGetFscTcscSuccess = (state: LogbookStoreData,
                                        action: RootActions.GetFscTcscSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    newState.currentLogbookData.FSCTCSCData = data;
    return newState;
};

export const handleGetStatcomSuccess = (state: LogbookStoreData,
                                        action: RootActions.GetStatcomSuccessAction): LogbookStoreData => {
    const newState: LogbookStoreData = cloneDeep(state);
    const data = action.payload;
    newState.currentLogbookData.STATCOMData = data;
    return newState;
};
