import { Component, OnInit } from '@angular/core';
import { NgrxFacade } from '@ng-mfe/shared/ngrx';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-mfe-remote1-entry',
  template: `<button (click)="sub()">Sub</button> {{ count$ | async }}`,
})
export class RemoteEntryComponent implements OnInit {
  count$: Observable<number>;
  constructor(private fa: NgrxFacade){
    this.count$ = this.fa.count$;
  }
  ngOnInit(): void {
    this.fa.init();
  }

  sub(): void {
    this.fa.sub();
  }
}
