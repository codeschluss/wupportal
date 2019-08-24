import { Component, HostBinding, Input } from '@angular/core';
import { IconCompat } from './icon.compat.i';

@Component({
  selector: 'icon-compat',
  template: `
    <fa-icon [icon]="[pack, icon]"></fa-icon>
  `
})

export class IconCompatComponent implements IconCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'icon';

  @Input()
  public icon: string;

  @Input()
  public pack: string = 'fas';

}
