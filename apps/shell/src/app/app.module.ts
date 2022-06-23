import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mfe';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedNgrxModule } from '@ng-mfe/shared/ngrx';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('shell state', state);
    console.log('shell action', action);
 
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
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
    RouterModule.forRoot(
      [
        {
          path: '',
          component: NxWelcomeComponent,
        },
        {
          path: 'remote1',
          loadChildren: () =>
            loadRemoteModule('remote1', './Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'remote2',
          loadChildren: () =>
            loadRemoteModule('remote2', './Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
