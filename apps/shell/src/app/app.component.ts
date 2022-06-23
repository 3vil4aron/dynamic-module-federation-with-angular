import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NgrxFacade } from 'libs/shared/ngrx/src';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shell';
  count$: Observable<number>;
  constructor(private fa: NgrxFacade){
    this.count$ = fa.count$;
  }
  ngOnInit(): void {
      this.fa.init();
  }

  add(): void {
    this.fa.add();
  }
}
