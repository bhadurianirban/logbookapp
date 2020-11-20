import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddConfigSuccessAction = (state: MasterDataStoreData,
                                             action: RootActions.AddConfigValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.configValueData && currentState.configValueData.length > 0) {
        currentState.configValueData.push(data);
    } else {
        currentState.configValueData = [data];
    }
    return currentState;
};

export const handleUpdateConfigSuccessAction = (state: MasterDataStoreData,
                                                action: RootActions.UpdateConfigValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.configValueData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        currentState.configValueData[elementIndex] = data;
    }
    return currentState;
};
