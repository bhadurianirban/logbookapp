import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { UserStoreData } from '../user.store';

export const LoggedInUserSelectFeature = (state: ApplicationState) => state.userAuthData;

export const selectCurrentLoggedInUser = createSelector(LoggedInUserSelectFeature, (state: UserStoreData) => state.currentUser);
