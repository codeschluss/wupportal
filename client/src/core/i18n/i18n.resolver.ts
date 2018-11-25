import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SessionResolver } from '../session/session.resolver';

@Injectable({ providedIn: 'root' })
export class I18nResolver implements Resolve<string> {

  public xlf: string;

  public constructor(
    private httpClient: HttpClient,
    private session: SessionResolver
  ) { }

  public async resolve(): Promise<string> {
    return this.xlf ? Promise.resolve(this.xlf) : this.resolver();
  }

  private async resolver(): Promise<string> {
    const session = await this.session.resolve();
    const url = `/i18n/strings.${session.language}.xlf`;
    const request = this.httpClient.get(url, { responseType: 'text' });
    return this.xlf = await request.toPromise();
  }

}
