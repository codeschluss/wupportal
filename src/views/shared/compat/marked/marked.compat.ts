import { Component, HostBinding, Input } from '@angular/core';
import { MarkedCompat } from './marked.compat.i';

@Component({
  selector: 'marked-compat',
  styles: [`
    div {
      font-family: sans-serif;
    }
  `],
  template: `
    <div [innerHTML]="html"></div>
  `
})

export class MarkedCompatComponent implements MarkedCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'marked';

  @Input()
  public data: string;

  public get html(): string {
    return this.data;
  }

}
