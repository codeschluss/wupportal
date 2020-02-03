import { Component, HostBinding, Input } from '@angular/core';
import { MarkedComponent as Compat } from './marked.component.i';

@Component({
  selector: 'marked-component',
  styles: [`
    div {
      font-family: sans-serif;
    }
  `],
  template: `
    <div [innerHTML]="html"></div>
  `
})

export class MarkedComponent implements Compat {

  @HostBinding('attr.component')
  public readonly component: string = 'marked';

  @Input()
  public data: string;

  public get html(): string {
    return this.data;
  }

}
