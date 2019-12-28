import { Component, HostBinding, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page';
import { PagerCompat } from './pager.compat.i';

if (!isKnownView('pager-compat')) {
  registerElement('pager-compat', () => ContentView);
}

@Component({
  selector: 'pager-compat',
  styleUrls: ['pager.compat.scss'],
  template: `
    <StackLayout>
      <AbsoluteLayout class="prev">
        <GridLayout>
          <i18n i18n="@@previous" unit="previous"></i18n>
        </GridLayout>
        <icon-compat ripple
          icon="angle-double-left"
          rippleColor="#fff"
          [isEnabled]="prev"
          [isUserInteractionEnabled]="prev"
          [ngClass]="{ disabled: !prev }"
          (tap)="router.navigate([], { queryParams: prevLink })">
        </icon-compat>
        <AbsoluteLayout></AbsoluteLayout>
      </AbsoluteLayout>
      <AbsoluteLayout class="next">
        <GridLayout>
          <i18n i18n="@@following" unit="following"></i18n>
        </GridLayout>
        <icon-compat ripple
          icon="angle-double-left"
          rippleColor="#fff"
          [isEnabled]="next"
          [isUserInteractionEnabled]="next"
          [ngClass]="{ disabled: !next }"
          (tap)="router.navigate([], { queryParams: nextLink })">
        </icon-compat>
        <AbsoluteLayout></AbsoluteLayout>
      </AbsoluteLayout>
    </StackLayout>
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
    public router: Router,
    private route: ActivatedRoute
  ) { }

}
