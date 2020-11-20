import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { DesignationStoreData } from '../designation.store';

export const selectFeatureDesignations = (state: ApplicationState) => state.designationData;

export const selectDesignationMasterElements = createSelector(selectFeatureDesignations, (state: DesignationStoreData) => state);
