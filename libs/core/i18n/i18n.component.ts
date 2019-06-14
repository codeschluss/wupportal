import { AfterViewInit, Component, ElementRef, TRANSLATIONS, TRANSLATIONS_FORMAT, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { I18nResolver } from './i18n.resolver';

export function TRANSLATIONS_FACTORY(i18nResolver: I18nResolver) {
  return i18nResolver.xliff;
}

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
  template: `<slot #text><ng-content></ng-content></slot>`
})

export class I18nComponent implements AfterViewInit {

  @ViewChild('text', { static: true })
  private slot: ElementRef;

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
