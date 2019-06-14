import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-compat',
  template: `<fa-icon [icon]="id"></fa-icon>`
})

export class IconCompat {

  @Input()
  public id: string;

}
