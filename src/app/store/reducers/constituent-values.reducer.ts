import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddConstituentSuccessAction = (state: MasterDataStoreData,
                                                  action: RootActions.AddConstituentValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.constituentValueData && currentState.constituentValueData.length > 0) {
        currentState.constituentValueData.push(data);
    } else {
        currentState.constituentValueData = [data];
    }
    return currentState;
};

export const handleUpdateConstituentSuccessAction = (state: MasterDataStoreData,
                                                     action: RootActions.UpdateConstituentValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.constituentValueData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.constituentValueData[elementIndex] = data;
    }
    return currentState;
};

export const handleDeleteConstituentSuccessAction = (state: MasterDataStoreData,
                                                     action: RootActions.DeleteConstituentValuesSuccessAction): MasterDataStoreData => {
                                                    const currentState = cloneDeep(state);
                                                    const data = action.payload;

                                                    // tslint:disable-next-line: max-line-length
                                                    const elementIndex = currentState.constituentValueData.findIndex(x => x.Id === data.Id);
                                                    if (elementIndex > -1) {
                                                        currentState.constituentValueData.splice(elementIndex, 1);
}
                                                    return currentState;
};
