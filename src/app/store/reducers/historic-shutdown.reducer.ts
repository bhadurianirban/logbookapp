import { HistoricElementStore } from '../historic-elements.store';
import { cloneDeep } from 'lodash';
import * as RootActions from '../actions/index';

export const handleHistoricShutdownUpdateSuccessAction = (state: HistoricElementStore,
                                                          action: RootActions.UpdateHistoryApprovedShutdownSuccessAction):
                                                           HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find the outage element
    const elementIndex = newState.historicElementsData.ShutdownData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.ShutdownData[elementIndex] = data;
    }
    return newState;
};

export const handleHistoricDeferShutdownSuccessAction = (state: HistoricElementStore,
                                                         action: RootActions.DeferHistoryShutdownSuccessAction): HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the outage element
    const elementIndex = newState.historicElementsData.ShutdownData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.ShutdownData.splice(elementIndex, 1);
    }
    return newState;
};
