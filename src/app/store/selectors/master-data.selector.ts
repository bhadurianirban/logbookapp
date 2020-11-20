import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { MasterDataStoreData } from '../master-data.store';

export const masterDataSelectFeature = (state: ApplicationState) => state.masterDataStore;

export const selectConfigValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.configValueData : null);
export const selectViolationValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.violationValueData : null);
export const selectConstituentValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.constituentValueData : null);
export const selectIssueValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.issueValueData : null);
export const selectTrippingValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.trippingValueData : null);
export const selectSchedulingValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.schedulingValueData : null);
export const selectDesignationValueData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.designationValueData : null);
export const selectFirstTimeChargeLineData =
createSelector(masterDataSelectFeature, (state: MasterDataStoreData) => state ? state.firstTimeChargeLineData : null);
