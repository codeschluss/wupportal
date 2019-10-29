import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
import { SessionProvider } from '../session/session.provider';

export function TRANSLATIONS_FACTORY(i18nResolver: I18nResolver) {
  return i18nResolver.xliff;
}

@Injectable({ providedIn: 'root' })
export class I18nResolver implements Resolve<string> {

  public xliff: string = '';

  public constructor(
    private httpClient: HttpClient,
    private sessionProvider: SessionProvider
  ) { }

  public resolve(): Observable<string> {
    return this.xliff ? of(this.xliff) : this.run();
  }

  private run(): Observable<string> {
    return this.sessionProvider.value.pipe(take(1), mergeMap((session) => {
      const path = `/i18n/strings.${session.language}.xliff`;
      return this.httpClient.get(path, { responseType: 'text' });
    }), tap((xliff) => this.xliff = xliff));
  }

}
