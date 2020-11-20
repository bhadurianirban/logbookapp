import { HistoricElementStore } from '../historic-elements.store';
import { cloneDeep } from 'lodash';
import * as RootActions from '../actions/index';

export const handleHistoricDeleteAntiTheftSuccessAction = (state: HistoricElementStore,
                                                           action: RootActions.DeleteHistoryAntiTheftSuccessAction):
                                                            HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.historicElementsData.AntiTheftData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.AntiTheftData.splice(elementIndex, 1);
    }
    return newState;
};

export const handleHistoricAntiTheftUpdateSuccessAction = (state: HistoricElementStore,
                                                           action: RootActions.UpdateHistoryAntiTheftSuccessAction):
                                                            HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.historicElementsData.AntiTheftData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.AntiTheftData[elementIndex] = data;
    }
    return newState;
};
