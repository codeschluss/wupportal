import { Component, Input, OnInit, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page/page';
import { I18nComponent as Compat } from './i18n.component.d';
import { I18nResolver, TRANSLATIONS_FACTORY } from './i18n.resolver';

if (!isKnownView('i18n')) {
  registerElement('i18n', () => ContentView);
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
  template: `<label [text]="text"></label>`
})

export class I18nComponent extends ContentView
  implements Compat, OnInit {

  @Input()
  public unit: string;

  public text: string;

  public constructor(
    private i18n: I18n
  ) {
    super();
  }

  public ngOnInit(): void {
    this.text = this.i18n({ id: this.unit, value: this.unit }) || this.unit;
  }

}
