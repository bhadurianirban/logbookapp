import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { ALDCLoadStore } from '../aldc-load.store';

export const ALDCLoadSelectFeature = (state: ApplicationState) => state.aldcLoadDataStore;
export const selectLoadData = createSelector(ALDCLoadSelectFeature, (state: ALDCLoadStore) => state.aldcLoadData);
