import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedNgrxModule } from 'libs/shared/ngrx/src';
import { AppComponent } from './app.component';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('remote1 state', state);
    console.log('remote1 action', action);
 
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
 declarations: [AppComponent],
 imports: [
   BrowserModule,
   StoreModule.forRoot({ }, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionSerializability: true,
      strictStateSerializability: true
    }
  }),
  EffectsModule.forRoot(),
  SharedNgrxModule,
   RouterModule.forRoot([{
     path: '',
     loadChildren: () => import('./remote-entry/entry.module').then(m => m.RemoteEntryModule)
   }], { initialNavigation: 'enabledBlocking' }),
 ],
 providers: [],
 bootstrap: [AppComponent],
})
export class AppModule {}