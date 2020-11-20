import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { UserMasterStoreData } from '../user-master.store';

export const selectFeatureUsers = (state: ApplicationState) => state.userData;

export const selectUserMasterElements = createSelector(selectFeatureUsers, (state: UserMasterStoreData) => state);
