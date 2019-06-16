import { Component, Input } from '@angular/core';
import { IconCompat as Compat } from './icon.compat.d';

@Component({
  selector: 'icon-compat',
  template: `<fa-icon [icon]="name"></fa-icon>`
})

export class IconCompat implements Compat {

  @Input()
  public name: string;

}
