import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-compat',
  template: `<fa-icon [icon]="name"></fa-icon>`
})

export class IconCompat {

  @Input()
  public name: string;

}
