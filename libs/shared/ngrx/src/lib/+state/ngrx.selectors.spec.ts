import { NgrxEntity } from './ngrx.models';
import { ngrxAdapter, NgrxPartialState, initialState } from './ngrx.reducer';
import * as NgrxSelectors from './ngrx.selectors';

describe('Ngrx Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNgrxId = (it: NgrxEntity) => it.id;
  const createNgrxEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NgrxEntity);

  let state: NgrxPartialState;

  beforeEach(() => {
    state = {
      ngrx: ngrxAdapter.setAll(
        [
          createNgrxEntity('PRODUCT-AAA'),
          createNgrxEntity('PRODUCT-BBB'),
          createNgrxEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Ngrx Selectors', () => {
    it('getAllNgrx() should return the list of Ngrx', () => {
      const results = NgrxSelectors.getAllNgrx(state);
      const selId = getNgrxId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = NgrxSelectors.getSelected(state) as NgrxEntity;
      const selId = getNgrxId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getNgrxLoaded() should return the current "loaded" status', () => {
      const result = NgrxSelectors.getNgrxLoaded(state);

      expect(result).toBe(true);
    });

    it('getNgrxError() should return the current "error" state', () => {
      const result = NgrxSelectors.getNgrxError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
