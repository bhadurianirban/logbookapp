import { HistoricElementStore } from '../historic-elements.store';
import { cloneDeep } from 'lodash';
import * as RootActions from '../actions/index';

export const handleHistoricFirstTimeChargeUpdateSuccessAction = (state: HistoricElementStore,
                                                             action: RootActions.UpdateHistoryFirstTimeChargeSuccessAction):
                                                              HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.historicElementsData.FirstTimeChargeData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.FirstTimeChargeData[elementIndex] = data;
    }
    return newState;
};

export const handleHistoricDeleteFirstTimeChargeSuccessAction = (state: HistoricElementStore,
                                                             action: RootActions.DeleteHistoryFirstTimeChargeSuccessAction):
                                                              HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the first time charge element
    const elementIndex = newState.historicElementsData.FirstTimeChargeData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.FirstTimeChargeData.splice(elementIndex, 1);
    }
    return newState;
};
