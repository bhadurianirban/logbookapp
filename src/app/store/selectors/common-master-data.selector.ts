import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { MasterStoreData } from '../element-master.store';

export const selectCommonMasterFeature = (state: ApplicationState) => state.commonMasterStoreData;

export const selectCommonMasterData = createSelector(selectCommonMasterFeature, (state: MasterStoreData) => state);

export const selectOutageMasterData =  createSelector(selectCommonMasterFeature, (state: MasterStoreData) => state.outageMaster);

export const selectStateDeviation = createSelector(selectCommonMasterFeature, (state: MasterStoreData) => state.stateDeviation);
