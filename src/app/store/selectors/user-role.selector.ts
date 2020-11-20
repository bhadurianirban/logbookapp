import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../state';
import { UserRoleMapStoreData } from '../user-role-map.store';

export const selectFeatureUserRoles = (state: ApplicationState) => state.userRoleMapData;

export const selectUserRoleMasterElements = createSelector(selectFeatureUserRoles, (state: UserRoleMapStoreData) => state);
