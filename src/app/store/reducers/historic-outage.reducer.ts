import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';
import { HistoricElementStore } from '../historic-elements.store';


export const handleHistoricOutageDeleteSuccessAction = (state: HistoricElementStore,
                                                        action: RootActions.DeleteHistoryOutageSuccessAction): HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.historicElementsData.OutageData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.OutageData.splice(elementIndex, 1);
    }
    return newState;
};

export const handleHistoricOutageUpdateSuccessAction = (state: HistoricElementStore,
                                                        action: RootActions.UpdateHistoryOutageSuccessAction): HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.historicElementsData.OutageData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.OutageData[elementIndex] = data;
    }
    return newState;
};
