import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageModel, LanguageProvider, PlatformProvider, SessionProvider } from '../../../../core';

@Component({
  selector: 'language-gear',
  styleUrls: ['language.gear.sass'],
  templateUrl: 'language.gear.html'
})

export class LanguageGearComponent
  implements OnInit {

  public languages: Observable<LanguageModel[]>;

  public get language(): string {
    return this.sessionProvider.getLanguage();
  }

  public set language(value: string) {
    if (value !== this.sessionProvider.getLanguage()) {
      this.sessionProvider.setLanguage(value);
      setTimeout(() => this.platformProvider.reload(), 500);
    }
  }

  public constructor(
    private languageProvider: LanguageProvider,
    private platformProvider: PlatformProvider,
    private sessionProvider: SessionProvider
  ) { }

  public ngOnInit(): void {
    this.languages = this.languageProvider.readAll();
  }

}
