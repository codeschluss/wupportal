import { Component, Input } from '@angular/core';
import { IconCompat } from './icon.compat.i';

@Component({
  selector: 'icon-compat',
  template: `<fa-icon [icon]="name"></fa-icon>`
})

export class IconCompatComponent implements IconCompat {

  @Input()
  public name: string;

}
