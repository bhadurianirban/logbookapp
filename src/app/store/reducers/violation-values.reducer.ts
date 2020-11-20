import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddViolationSuccessAction = (state: MasterDataStoreData,
                                                action: RootActions.AddViolationValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.violationValueData && currentState.violationValueData.length > 0) {
        currentState.violationValueData.push(data);
    } else {
        currentState.violationValueData = [data];
    }
    return currentState;
};

export const handleUpdateViolationSuccessAction = (state: MasterDataStoreData,
                                                   action: RootActions.UpdateViolationValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.violationValueData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.violationValueData[elementIndex] = data;
    }
    return currentState;
};

export const handleDeleteViolationSuccessAction = (state: MasterDataStoreData,
                                                   action: RootActions.DeleteViolationValuesSuccessAction): MasterDataStoreData => {
                                                    const currentState = cloneDeep(state);
                                                    const data = action.payload;

                                                    // tslint:disable-next-line: max-line-length
                                                    const elementIndex = currentState.violationValueData.findIndex(x => x.Id === data.Id);
                                                    if (elementIndex > -1) {
                                                        currentState.violationValueData.splice(elementIndex, 1);
}
                                                    return currentState;
};
