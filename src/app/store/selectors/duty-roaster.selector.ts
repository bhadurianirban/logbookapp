import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { DutyRoasterStoreData } from '../duty-roaster.store';

export const selectFeatureDutyRoaster = (state: ApplicationState) => state.dutyRoasterData;

export const selectDutyRoasterElements = createSelector(selectFeatureDutyRoaster, (state: DutyRoasterStoreData) => state);
