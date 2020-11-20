import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { LogbookStoreData } from '../logbook.store';

export const logbookSelectFeature = (state: ApplicationState) => state.currentLogbookData;

export const selectCurrentLogbook = createSelector(logbookSelectFeature, (state: LogbookStoreData) => state.currentLogbookData);
