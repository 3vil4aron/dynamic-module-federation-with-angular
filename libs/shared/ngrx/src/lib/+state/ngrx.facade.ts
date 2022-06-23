import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as NgrxActions from './ngrx.actions';
import * as NgrxFeature from './ngrx.reducer';
import * as NgrxSelectors from './ngrx.selectors';

@Injectable()
export class NgrxFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(NgrxSelectors.getNgrxLoaded));
  allNgrx$ = this.store.pipe(select(NgrxSelectors.getAllNgrx));
  selectedNgrx$ = this.store.pipe(select(NgrxSelectors.getSelected));
  count$ = this.store.pipe(select(NgrxSelectors.getCount));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(NgrxActions.init());
  }

  add() {
    this.store.dispatch(NgrxActions.addCount());
  }

  sub() {
    this.store.dispatch(NgrxActions.subCount());
  }
}
