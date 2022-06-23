import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NGRX_FEATURE_KEY, State, ngrxAdapter } from './ngrx.reducer';

// Lookup the 'Ngrx' feature state managed by NgRx
export const getNgrxState = createFeatureSelector<State>(NGRX_FEATURE_KEY);

const { selectAll, selectEntities } = ngrxAdapter.getSelectors();

export const getNgrxLoaded = createSelector(
  getNgrxState,
  (state: State) => state.loaded
);

export const getNgrxError = createSelector(
  getNgrxState,
  (state: State) => state.error
);

export const getAllNgrx = createSelector(getNgrxState, (state: State) =>
  selectAll(state)
);

export const getNgrxEntities = createSelector(getNgrxState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getNgrxState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getNgrxEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
