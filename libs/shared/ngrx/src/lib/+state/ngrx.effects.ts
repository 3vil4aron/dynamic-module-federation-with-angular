import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as NgrxActions from './ngrx.actions';
import * as NgrxFeature from './ngrx.reducer';

@Injectable()
export class NgrxEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return NgrxActions.loadNgrxSuccess({ ngrx: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return NgrxActions.loadNgrxFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
