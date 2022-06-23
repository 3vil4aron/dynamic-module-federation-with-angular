import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as NgrxActions from './ngrx.actions';
import { NgrxEffects } from './ngrx.effects';

describe('NgrxEffects', () => {
  let actions: Observable<Action>;
  let effects: NgrxEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        NgrxEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(NgrxEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NgrxActions.init() });

      const expected = hot('-a-|', {
        a: NgrxActions.loadNgrxSuccess({ ngrx: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
