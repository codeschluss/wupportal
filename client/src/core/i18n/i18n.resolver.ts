import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SessionResolver } from '../session/session.resolver';

@Injectable({ providedIn: 'root' })
export class I18nResolver implements Resolve<string> {

  public translation: string;

  public constructor(
    private httpClient: HttpClient,
    private session: SessionResolver
  ) { }

  public resolve(): Promise<string> {
    return this.translation
      ? Promise.resolve(this.translation)
      : this.resource();
  }

  private async resource(): Promise<string> {
    const session = await this.session.resolve();
    const url = `/i18n/strings.${session.language}.xlf`;
    const request = this.httpClient.get(url, { responseType: 'text' });
    return this.translation = await request.toPromise();
  }

}
