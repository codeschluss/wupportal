import { Component, HostBinding, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import { MarkedCompat } from './marked.compat.i';

@Component({
  selector: 'marked-compat',
  template: `
    <div [innerHTML]="html"></div>
  `
})

export class MarkedCompatComponent
  implements MarkedCompat, OnInit {

  @HostBinding('attr.compat')
  public readonly compat: string = 'marked';

  @Input()
  public data: string;

  public html: string;

  public ngOnInit() {
    this.html = marked(this.data || '');
  }

}
