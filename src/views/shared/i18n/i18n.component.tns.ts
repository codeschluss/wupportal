import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { Label } from 'tns-core-modules/ui/label';
import { ContentView } from 'tns-core-modules/ui/page';
import { I18nComponent as Compat } from './i18n.component.i';

if (!isKnownView('i18n')) {
  registerElement('i18n', () => ContentView);
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'i18n',
  template: `
    <Label #wrapper></Label>
  `
})

export class I18nComponent implements Compat, AfterViewInit {

  @HostBinding('attr.component')
  public readonly component: string = 'i18n';

  public text: string;

  @Input()
  public unit: string;

  @ViewChild('wrapper', { read: ElementRef, static: true })
  private wrapper: ElementRef<Label>;

  public constructor(
    private i18n: I18n
  ) { }

  public ngAfterViewInit(): void {
    const unit = this.unit;
    this.text = this.i18n({ id: unit, value: unit }) || unit;
    this.wrapper.nativeElement.text = this.text;
  }

}
