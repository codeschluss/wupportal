import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { I18nComponent as Compat } from './i18n.component.i';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'i18n',
  template: `
    <slot #wrapper><ng-content></ng-content></slot>
  `
})

export class I18nComponent implements Compat, AfterViewInit {

  @HostBinding('attr.component')
  public readonly component: string = 'i18n';

  public text: string;

  @Input()
  public unit: string;

  @ViewChild('wrapper', { read: ElementRef, static: true })
  private wrapper: ElementRef<HTMLElement>;

  public constructor(
    private i18n: I18n
  ) { }

  public ngAfterViewInit(): void {
    const unit = this.unit || this.wrapper.nativeElement.innerHTML;
    this.text = this.i18n({ id: unit, value: unit }) || unit;
    this.wrapper.nativeElement.innerHTML = this.text;
  }

}
