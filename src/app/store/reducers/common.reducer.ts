import { CommonStoreData, INITIAL_COMMON_STORE_DATA } from '../common.store';
import * as commonActions from '../actions/common-actions';
import { cloneDeep } from 'lodash';

export function CommonReducer(state: CommonStoreData = INITIAL_COMMON_STORE_DATA,
                              action: commonActions.LoadingIndicatorAction): CommonStoreData {
    switch (action.type) {
        case commonActions.LOADING_INDICATOR_ACTION:
            const newState: CommonStoreData = cloneDeep(state);
            if (action.payload !== undefined) {
                newState.loading = action.payload;
            }
            return newState;
        default:
            return state;
    }
}
