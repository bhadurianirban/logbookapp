import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddLineSuccessAction = (state: MasterDataStoreData,
                                             action: RootActions.AddLineValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.firstTimeChargeLineData && currentState.firstTimeChargeLineData.length > 0) {
        currentState.firstTimeChargeLineData.push(data);
    } else {
        currentState.firstTimeChargeLineData = [data];
    }
    return currentState;
};

export const handleUpdateLineSuccessAction = (state: MasterDataStoreData,
                                                action: RootActions.UpdateLineValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.firstTimeChargeLineData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.firstTimeChargeLineData[elementIndex] = data;
    }
    return currentState;
};
