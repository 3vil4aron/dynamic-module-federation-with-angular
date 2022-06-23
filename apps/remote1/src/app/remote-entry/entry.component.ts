import { Component, OnInit } from '@angular/core';
import { NgrxFacade } from '@ng-mfe/shared/ngrx';

@Component({
  selector: 'ng-mfe-remote1-entry',
  template: `<button (click)="sub()">Sub</button>`,
})
export class RemoteEntryComponent implements OnInit {
  constructor(private fa: NgrxFacade){}
  ngOnInit(): void {
    this.fa.init();
  }

  sub(): void {
    this.fa.sub();
  }
}
