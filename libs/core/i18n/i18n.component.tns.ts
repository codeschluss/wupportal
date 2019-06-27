import { Component, ElementRef, Input, TRANSLATIONS, TRANSLATIONS_FORMAT, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Label } from 'tns-core-modules/ui/label';
import { I18nComponent as Compat } from './i18n.component.i';
import { I18nResolver, TRANSLATIONS_FACTORY } from './i18n.resolver';

@Component({
  providers: [
    I18n,
    {
      deps: [I18nResolver],
      provide: TRANSLATIONS,
      useFactory: TRANSLATIONS_FACTORY
    },
    {
      provide: TRANSLATIONS_FORMAT,
      useValue: 'xliff'
    }
  ],
  // tslint:disable-next-line:component-selector
  selector: 'i18n',
  template: `
    <Label #wrapper></Label>
  `
})

export class I18nComponent implements Compat {

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
