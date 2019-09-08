import { Component, HostBinding, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagerCompat } from './pager.compat.i';

@Component({
  selector: 'pager-compat',
  styleUrls: ['pager.compat.scss'],
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
      page: (parseInt(this.route.snapshot.queryParams.page, 10) || 0) + 1
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
