import { AfterViewInit, Component, ElementRef, TRANSLATIONS, TRANSLATIONS_FORMAT, ViewChild } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { I18nResolver } from 'src/services/resolvers';


@Component({
  providers: [
    I18n,
    {
      deps: [I18nResolver],
      provide: TRANSLATIONS,
      useFactory: (i18n: I18nResolver) => i18n.translation
    },
    {
      provide: TRANSLATIONS_FORMAT,
      useValue: 'xlf'
    }
  ],
  // tslint:disable-next-line:component-selector
  selector: 'i18n',
  template: `<slot #text><ng-content></ng-content></slot>`
})

export class I18nComponent implements AfterViewInit {

  @ViewChild('text')
  text: ElementRef;

  constructor(
    private i18n: I18n
  ) { }

  public ngAfterViewInit(): void {
    const text = this.text.nativeElement.innerHTML;
    const i18n = this.i18n({ id: text, value: text });
    this.text.nativeElement.innerHTML = i18n || text;
  }

}
