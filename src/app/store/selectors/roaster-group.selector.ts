import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { RoasterGroupStoreData } from '../roaster-group.store';

export const selectFeatureRoasterGroup = (state: ApplicationState) => state.roasterGroupData;

export const selectRoasterGroupElements = createSelector(selectFeatureRoasterGroup, (state: RoasterGroupStoreData) => state);
