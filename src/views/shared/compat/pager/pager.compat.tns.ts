import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagerCompat } from './pager.compat.i';

@Component({
  selector: 'pager-compat',
  template: ``
})

export class PagerCompatComponent implements PagerCompat {

  @Output()
  public goto: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public next: boolean;

  @Input()
  public prev: boolean;

}
