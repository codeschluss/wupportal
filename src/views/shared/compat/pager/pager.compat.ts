import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagerCompat } from './pager.compat.i';

@Component({
  selector: 'pager-compat',
  styles: [`
    i18n { font-size: 1rem; padding: 0 .5rem; vertical-align: middle; }
    nav {
      display: flex;
      justify-content: space-between;
      max-width: 25rem;
      width: 100%
    }

    div { background-color: rgba(0, 0, 0, .12); width: 7.5rem; }
    div:first-of-type { text-align: left; }
    div:last-of-type { text-align: right; }

    div:first-of-type > button { margin-left: -1.5rem; }
    div:last-of-type > button { margin-right: -1.5rem; }
    button[disabled] { background: #888 !important; color: #FFF !important; }

    span { border: 1.25rem solid transparent; }
    div:first-of-type > span {
      border-right-color: #FAFAFA;
      border-left: none;
      float: right;
    }
    div:last-of-type > span {
      border-left-color: #FAFAFA;
      border-right: none;
      float: left;
    }
  `],
  template: `
    <nav>
      <div>
        <button mat-mini-fab
          color="primary"
          [disabled]="!prev"
          (click)="goto.emit(-1)">
          <icon-compat icon="angle-double-left"></icon-compat>
        </button>
        <i18n class="mat-caption" i18n="@@previous">previous</i18n>
        <span></span>
      </div>
      <div>
        <span></span>
        <i18n class="mat-caption" i18n="@@following">following</i18n>
        <button mat-mini-fab
          color="primary"
          [disabled]="!next"
          (click)="goto.emit(+1)">
          <icon-compat icon="angle-double-right"></icon-compat>
        </button>
      </div>
    </nav>
  `
})

export class PagerCompatComponent implements PagerCompat {

  @Output()
  public goto: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public next: boolean;

  @Input()
  public prev: boolean;

}
