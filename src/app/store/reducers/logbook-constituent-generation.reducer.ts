import { EnergySheetStoreData } from '../energy-sheet.store';
import * as RootActions from '../actions/index';
import { cloneDeep } from 'lodash';

export const handleAddConstituentGenerationSuccessAction = (state: EnergySheetStoreData,
                                                            action: RootActions.AddConstituentsGenerationSuccessAction): EnergySheetStoreData => {
    const data = action.payload;
    const currentState = cloneDeep(state);
    if (currentState.constituentsGenerationValueData) {
        currentState.constituentsGenerationValueData = data;
    }
    return currentState;
};
