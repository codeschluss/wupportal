import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page';
import { PagerCompat } from './pager.compat.i';

if (!isKnownView('pager-compat')) {
  registerElement('pager-compat', () => ContentView);
}

@Component({
  selector: 'pager-compat',
  template: ``
})

export class PagerCompatComponent implements PagerCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'pager';

  @Output()
  public goto: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public next: boolean;

  @Input()
  public prev: boolean;

}
