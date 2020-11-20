import { HistoricElementStore } from '../historic-elements.store';
import { cloneDeep } from 'lodash';
import * as RootActions from '../actions/index';

export const handleHistoricAutoRecloseUpdateSuccessAction = (state: HistoricElementStore,
                                                             action: RootActions.UpdateHistoryAutoRecloseSuccessAction):
                                                              HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.historicElementsData.AutoRecloseData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.AutoRecloseData[elementIndex] = data;
    }
    return newState;
};

export const handleHistoricDeleteAutoRecloseSuccessAction = (state: HistoricElementStore,
                                                             action: RootActions.DeleteHistoryAutoRecloseSuccessAction):
                                                              HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the auto reclose element
    const elementIndex = newState.historicElementsData.AutoRecloseData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.AutoRecloseData.splice(elementIndex, 1);
    }
    return newState;
};
