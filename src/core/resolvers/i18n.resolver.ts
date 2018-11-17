import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class I18nResolver implements Resolve<any> {

  public translation: string;

  private language: string;

  public constructor(
    private httpClient: HttpClient,
    private session: SessionProvider
  ) {
    this.session.subscribe((next) => this.language = next.language);
  }

  public async resolve(): Promise<string> {
    const url = `/i18n/strings.${this.language}.xlf`;
    const request = this.httpClient.get(url, { responseType: 'text' });
    return this.translation = await request.toPromise();
  }

}
