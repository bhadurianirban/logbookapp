import { MasterDataStoreData } from '../master-data.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddIssueSuccessAction = (state: MasterDataStoreData,
                                            action: RootActions.AddIssueValueSuccessAction): MasterDataStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.issueValueData && currentState.issueValueData.length > 0) {
        currentState.issueValueData.push(data);
    } else {
        currentState.issueValueData = [data];
    }
    return currentState;
};

export const handleUpdateIssueSuccessAction = (state: MasterDataStoreData,
                                               action: RootActions.UpdateIssueValueSuccessAction): MasterDataStoreData => {
    const currentState = cloneDeep(state);
    const data = action.payload;
    const elementIndex = currentState.issueValueData.findIndex(x => x.Id === data.Id);
    if (elementIndex > -1) {
        currentState.issueValueData[elementIndex] = data;
    }
    return currentState;
};

export const handleDeleteIssueSuccessAction = (state: MasterDataStoreData,
                                               action: RootActions.DeleteIssueValuesSuccessAction): MasterDataStoreData => {
                                                    const currentState = cloneDeep(state);
                                                    const data = action.payload;

                                                    // tslint:disable-next-line: max-line-length
                                                    const elementIndex = currentState.issueValueData.findIndex(x => x.Id === data.Id);
                                                    if (elementIndex > -1) {
                                                        currentState.issueValueData.splice(elementIndex, 1);
}
                                                    return currentState;
};
