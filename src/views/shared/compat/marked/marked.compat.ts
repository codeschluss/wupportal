import { Component, HostBinding, Input } from '@angular/core';
import { MarkedCompat } from './marked.compat.i';

@Component({
  selector: 'marked-compat',
  template: `
    <div [innerHTML]="data"></div>
  `
})

export class MarkedCompatComponent implements MarkedCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'marked';

  @Input()
  public data: string;

}
