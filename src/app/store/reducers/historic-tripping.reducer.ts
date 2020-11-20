import { cloneDeep } from 'lodash';
import * as RootActions from '../actions/index';
import { HistoricElementStore } from '../historic-elements.store';

export const handleHistoricTrippingUpdateSuccessAction = (state: HistoricElementStore,
                                                          action: RootActions.UpdateHistoryTrippingSuccessAction):
                                                            HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find the tripping element

        // remove previous data and add new data
    const elementIndex = newState.historicElementsData.TrippingData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.TrippingData[elementIndex] = data;
    }
    return newState;
};

export const handleHistoricDeleteTrippingSuccessAction = (state: HistoricElementStore,
                                                          action: RootActions.DeleteHistoryTrippingSuccessAction): HistoricElementStore => {
    const newState: HistoricElementStore = cloneDeep(state);
    const data = action.payload;
    // find and remove the tripping element
    const elementIndex = newState.historicElementsData.TrippingData.findIndex(x => x.RequestId === data.RequestId);
    if (elementIndex > -1) {
        newState.historicElementsData.TrippingData.splice(elementIndex, 1);
    }
    return newState;
};

