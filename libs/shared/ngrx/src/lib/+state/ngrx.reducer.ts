import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NgrxActions from './ngrx.actions';
import { NgrxEntity } from './ngrx.models';

export const NGRX_FEATURE_KEY = 'ngrx';

export interface State extends EntityState<NgrxEntity> {
  selectedId?: string | number; // which Ngrx record has been selected
  loaded: boolean; // has the Ngrx list been loaded
  error?: string | null; // last known error (if any)
  count: number;
}

export interface NgrxPartialState {
  readonly [NGRX_FEATURE_KEY]: State;
}

export const ngrxAdapter: EntityAdapter<NgrxEntity> =
  createEntityAdapter<NgrxEntity>();

export const initialState: State = ngrxAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  count: 0
});

const ngrxReducer = createReducer(
  initialState,
  on(NgrxActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(NgrxActions.loadNgrxSuccess, (state, { ngrx }) =>
    ngrxAdapter.setAll(ngrx, { ...state, loaded: true })
  ),
  on(NgrxActions.loadNgrxFailure, (state, { error }) => ({ ...state, error })),
  on(NgrxActions.addCount, (state) => {
    const s = {...state};
    s.count = s.count+1;
    return s;
  }),
  on(NgrxActions.subCount, (state) => {
    const s = {...state};
    s.count = s.count-1;
    return s;
  })

);

export function reducer(state: State | undefined, action: Action) {
  return ngrxReducer(state, action);
}
