import { AfterViewInit, Component, ElementRef, TRANSLATIONS, TRANSLATIONS_FORMAT, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { I18nComponent as Compat } from './i18n.component.d';
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
  template: `<slot #slot><ng-content></ng-content></slot>`
})

export class I18nComponent implements Compat, AfterViewInit {

  @ViewChild('slot', { static: true })
  public slot: ElementRef;

  public text: string;

  public constructor(
    private i18n: I18n
  ) { }

  public ngAfterViewInit(): void {
    const text = this.slot.nativeElement.innerHTML;
    this.text = this.i18n({ id: text, value: text }) || text;
    this.slot.nativeElement.innerHTML = this.text;
  }

}
