import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { EnergySheetStoreData } from '../energy-sheet.store';

export const energySheetSelectFeature = (state: ApplicationState) => state.energySheetStore;

export const selectConstituentsGenerationData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.constituentsGenerationValueData : null);
export const selectNepalFeedersData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.nepalFeedersValueData : null);
export const selectSugarMillsGenerationData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.sugarMillsGenerationValueData : null);
export const selectSolarPowerPlantsData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.solarPowerPlantsValueData : null);
export const selectMaxMinPowerData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.maxMinPowerValueData : null);
export const selectSystemReportData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.systemReportValueData : null);
export const selectSystemReportNetData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.systemReportNetValueData : null);
export const selectNBPDCLTieLinesExchangeData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.NBPDCLTieLinesExchangeValueData : null);
export const selectSBPDCLTieLinesExchangeData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.SBPDCLTieLinesExchangeValueData : null);
export const selectKhagaulData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.KhagaulValueData : null);
export const selectMiscData =
createSelector(energySheetSelectFeature, (state: EnergySheetStoreData) => state ? state.miscValueData : null);


