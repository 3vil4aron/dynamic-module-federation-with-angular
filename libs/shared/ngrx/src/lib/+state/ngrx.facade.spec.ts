import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as NgrxActions from './ngrx.actions';
import { NgrxEffects } from './ngrx.effects';
import { NgrxFacade } from './ngrx.facade';
import { NgrxEntity } from './ngrx.models';
import { NGRX_FEATURE_KEY, State, initialState, reducer } from './ngrx.reducer';
import * as NgrxSelectors from './ngrx.selectors';

interface TestSchema {
  ngrx: State;
}

describe('NgrxFacade', () => {
  let facade: NgrxFacade;
  let store: Store<TestSchema>;
  const createNgrxEntity = (id: string, name = ''): NgrxEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NGRX_FEATURE_KEY, reducer),
          EffectsModule.forFeature([NgrxEffects]),
        ],
        providers: [NgrxFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(NgrxFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allNgrx$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allNgrx$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadNgrxSuccess` to manually update list
     */
    it('allNgrx$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allNgrx$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        NgrxActions.loadNgrxSuccess({
          ngrx: [createNgrxEntity('AAA'), createNgrxEntity('BBB')],
        })
      );

      list = await readFirst(facade.allNgrx$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
