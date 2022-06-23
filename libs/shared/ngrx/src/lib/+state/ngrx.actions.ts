import { createAction, props } from '@ngrx/store';
import { NgrxEntity } from './ngrx.models';

export const init = createAction('[Ngrx Page] Init');

export const loadNgrxSuccess = createAction(
  '[Ngrx/API] Load Ngrx Success',
  props<{ ngrx: NgrxEntity[] }>()
);

export const loadNgrxFailure = createAction(
  '[Ngrx/API] Load Ngrx Failure',
  props<{ error: any }>()
);
