import { ApplicationState } from '../state';
import { createSelector } from '@ngrx/store';
import { CodeRepositoryStore } from '../code-repository.store';

export const codeRepositorySelectFeature = (state: ApplicationState) => state.codeRepository;

export const selectCodeRepository =
 createSelector(codeRepositorySelectFeature, (state: CodeRepositoryStore) => state.codeRepositoryData);
