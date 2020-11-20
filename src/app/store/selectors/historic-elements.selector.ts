import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { HistoricElementStore } from '../historic-elements.store';

export const historicElementsSelectFeature = (state: ApplicationState) => state.historicElements;

export const selectHistoricElemetns =
 createSelector(historicElementsSelectFeature, (state: HistoricElementStore) => state.historicElementsData);

