import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NgrxFacade } from 'libs/shared/ngrx/src';

@Component({
  selector: 'ng-mfe-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private fa: NgrxFacade){}
  ngOnInit(): void {
      this.fa.init();
  }
}