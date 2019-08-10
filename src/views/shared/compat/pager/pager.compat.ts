import { Component, HostBinding, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagerCompat } from './pager.compat.i';

@Component({
  selector: 'pager-compat',
  styles: [`
    i18n { font-size: 1rem; vertical-align: middle; }
    nav {
      display: flex;
      justify-content: space-between;
      max-width: 25rem;
      width: calc(100% - 3rem);
    }

    div { background-color: rgba(0, 0, 0, .12); width: 7.5rem; }
    div:first-of-type { text-align: left; }
    div:last-of-type { text-align: right; }

    div:first-of-type > a { margin-left: -1.5rem; margin-right: .5rem; }
    div:last-of-type > a { margin-left: .5rem; margin-right: -1.5rem; }
    a[disabled] {
      background: #888 !important;
      color: #FFF !important;
      pointer-events: none;
    }

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
        <a mat-mini-fab
          color="primary"
          queryParamsHandling="merge"
          [disabled]="!prev"
          [queryParams]="prevLink"
          [routerLink]="[]">
          <icon-compat icon="angle-double-left"></icon-compat>
        </a>
        <i18n class="mat-caption" i18n="@@previous">previous</i18n>
        <span></span>
      </div>
      <div>
        <span></span>
        <i18n class="mat-caption" i18n="@@following">following</i18n>
        <a mat-mini-fab
          color="primary"
          queryParamsHandling="merge"
          [disabled]="!next"
          [queryParams]="nextLink"
          [routerLink]="[]">
          <icon-compat icon="angle-double-right"></icon-compat>
        </a>
      </div>
    </nav>
  `
})

export class PagerCompatComponent implements PagerCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'pager';

  @Input()
  public next: boolean;

  @Input()
  public prev: boolean;

  public get nextLink(): object {
    return {
      page: parseInt(this.route.snapshot.queryParams.page, 10) || 0 + 1
    };
  }

  public get prevLink(): object {
    return {
      page: parseInt(this.route.snapshot.queryParams.page, 10) - 1 || null
    };
  }

  public constructor(
    private route: ActivatedRoute
  ) { }

}
