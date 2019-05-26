import { Component } from '@angular/core';
import { SessionModel } from '@wooportal/core';

@Component({
  template: `<page-router-outlet></page-router-outlet>`
})

export class NativeComponent {

  private session: SessionModel;

  public constructor() {
    this.session = new SessionModel();
  }

}
