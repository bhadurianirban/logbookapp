import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddDesignationSuccessAction = (state: MasterDataStoreData,
                                                  action: RootActions.AddDesignationValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.designationValueData && currentState.designationValueData.length > 0) {
        currentState.designationValueData.push(data);
    } else {
        currentState.designationValueData = [data];
    }
    return currentState;
};

export const handleUpdateDesignationSuccessAction = (state: MasterDataStoreData,
                                                     action: RootActions.UpdateDesignationValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.designationValueData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.designationValueData[elementIndex] = data;
    }
    return currentState;
};

export const handleDeleteDesignationSuccessAction = (state: MasterDataStoreData,
                                                     action: RootActions.DeleteDesignationValuesSuccessAction): MasterDataStoreData => {
                                                    const currentState = cloneDeep(state);
                                                    const data = action.payload;

                                                    // tslint:disable-next-line: max-line-length
                                                    const elementIndex = currentState.designationValueData.findIndex(x => x.Id === data.Id);
                                                    if (elementIndex > -1) {
                                                        currentState.designationValueData.splice(elementIndex, 1);
}
                                                    return currentState;
};

export const handleSaveDesignationSuccessAction = (state: MasterDataStoreData,
                                                   action: RootActions.SaveDesignationValueSuccessAction): MasterDataStoreData => {
const currentState = cloneDeep(state);
const data = action.payload;
currentState.designationValueData = data;
return currentState;
};
