import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import * as marked from 'marked';
import { MarkedCompat } from './marked.compat.i';

@Component({
  selector: 'marked-compat',
  template: `
    <div [innerHTML]="html"></div>
  `
})

export class MarkedCompatComponent implements MarkedCompat, OnChanges {

  @HostBinding('attr.compat')
  public readonly compat: string = 'marked';

  @Input()
  public data: string;

  public html: string;

  public ngOnChanges() {
    this.html = marked(this.data);
  }

}
