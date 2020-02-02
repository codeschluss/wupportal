import { Component, HostBinding, Input } from '@angular/core';
import { IconComponent as Compat } from './icon.component.i';

@Component({
  selector: 'icon-component',
  template: `
    <fa-icon [icon]="[pack, icon]"></fa-icon>
  `
})

export class IconComponent implements Compat {

  @HostBinding('attr.component')
  public readonly component: string = 'icon';

  @Input()
  public icon: string;

  @Input()
  public pack: string = 'fas';

}
