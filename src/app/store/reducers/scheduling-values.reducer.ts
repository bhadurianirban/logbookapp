import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddSchedulingSuccessAction = (state: MasterDataStoreData,
                                                 action: RootActions.AddSchedulingValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.schedulingValueData && currentState.schedulingValueData.length > 0) {
        currentState.schedulingValueData.push(data);
    } else {
        currentState.schedulingValueData = [data];
    }
    return currentState;
};

export const handleUpdateSchedulingSuccessAction = (state: MasterDataStoreData,
                                                    action: RootActions.UpdateSchedulingValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.schedulingValueData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.schedulingValueData[elementIndex] = data;
    }
    return currentState;
};

export const handleDeleteSchedulingSuccessAction = (state: MasterDataStoreData,
                                                    action: RootActions.DeleteSchedulingValuesSuccessAction): MasterDataStoreData => {
                                                    const currentState = cloneDeep(state);
                                                    const data = action.payload;

                                                    // tslint:disable-next-line: max-line-length
                                                    const elementIndex = currentState.schedulingValueData.findIndex(x => x.Id === data.Id);
                                                    if (elementIndex > -1) {
                                                        currentState.schedulingValueData.splice(elementIndex, 1);
}
                                                    return currentState;
};
