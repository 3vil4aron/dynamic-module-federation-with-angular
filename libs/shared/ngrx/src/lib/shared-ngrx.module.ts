import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNgrx from './+state/ngrx.reducer';
import { NgrxEffects } from './+state/ngrx.effects';
import { NgrxFacade } from './+state/ngrx.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNgrx.NGRX_FEATURE_KEY, fromNgrx.reducer),
    EffectsModule.forFeature([NgrxEffects]),
  ],
  providers: [NgrxFacade],
})
export class SharedNgrxModule {}
