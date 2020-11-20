import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { RoasterGroupUserStoreData } from '../roaster-group-user.store';

export const selectFeatureRoasterGroupUser = (state: ApplicationState) => state.roasterGroupUserData;

export const selectRoasterGroupUserElements = createSelector(selectFeatureRoasterGroupUser, (state: RoasterGroupUserStoreData) => state);
