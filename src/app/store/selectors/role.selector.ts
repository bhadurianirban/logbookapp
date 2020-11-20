import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { RoleStoreData } from '../role.store';

export const selectFeatureRoles = (state: ApplicationState) => state.roleData;

export const selectRoleMasterElements = createSelector(selectFeatureRoles, (state: RoleStoreData) => state);
