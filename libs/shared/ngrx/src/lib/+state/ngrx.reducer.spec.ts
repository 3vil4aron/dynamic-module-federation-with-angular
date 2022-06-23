import { Action } from '@ngrx/store';

import * as NgrxActions from './ngrx.actions';
import { NgrxEntity } from './ngrx.models';
import { State, initialState, reducer } from './ngrx.reducer';

describe('Ngrx Reducer', () => {
  const createNgrxEntity = (id: string, name = ''): NgrxEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Ngrx actions', () => {
    it('loadNgrxSuccess should return the list of known Ngrx', () => {
      const ngrx = [
        createNgrxEntity('PRODUCT-AAA'),
        createNgrxEntity('PRODUCT-zzz'),
      ];
      const action = NgrxActions.loadNgrxSuccess({ ngrx });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
