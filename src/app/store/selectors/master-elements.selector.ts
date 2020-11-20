import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { MasterElementsStoreData } from '../element-master.store';

export const selectFeature = (state: ApplicationState) => state.masterElementsData;

export const selectMasterElements = createSelector(selectFeature, (state: MasterElementsStoreData) => state);
