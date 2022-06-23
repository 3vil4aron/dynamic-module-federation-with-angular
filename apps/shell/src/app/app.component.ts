import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NgrxFacade } from 'libs/shared/ngrx/src';

@Component({
  selector: 'ng-mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shell';

  constructor(private fa: NgrxFacade){}
  ngOnInit(): void {
      this.fa.init();
  }
}
