import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddTrippingSuccessAction = (state: MasterDataStoreData,
                                               action: RootActions.AddTrippingValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.trippingValueData && currentState.trippingValueData.length > 0) {
        currentState.trippingValueData.push(data);
    } else {
        currentState.trippingValueData = [data];
    }
    return currentState;
};

export const handleUpdateTrippingSuccessAction = (state: MasterDataStoreData,
                                                  action: RootActions.UpdateTrippingValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.trippingValueData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.trippingValueData[elementIndex] = data;
    }
    return currentState;
};

export const handleDeleteTrippingSuccessAction = (state: MasterDataStoreData,
                                                  action: RootActions.DeleteTrippingValuesSuccessAction): MasterDataStoreData => {
                                                    const currentState = cloneDeep(state);
                                                    const data = action.payload;

                                                    // tslint:disable-next-line: max-line-length
                                                    const elementIndex = currentState.trippingValueData.findIndex(x => x.Id === data.Id);
                                                    if (elementIndex > -1) {
                                                        currentState.trippingValueData.splice(elementIndex, 1);
}
                                                    return currentState;
};
