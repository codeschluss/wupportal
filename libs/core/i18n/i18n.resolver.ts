import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class I18nResolver implements Resolve<string> {

  public xlf: string;

  public constructor(
    private httpClient: HttpClient,
    private sessionProvider: SessionProvider
  ) { }

  public async resolve(): Promise<string> {
    return this.xlf ? Promise.resolve(this.xlf) : this.run();
  }

  private async run(): Promise<string> {
    const session = await this.sessionProvider.value.pipe(take(1)).toPromise();
    const url = `/i18n/strings.${session.language}.xlf`;
    const request = this.httpClient.get(url, { responseType: 'text' });
    return this.xlf = await request.toPromise();
  }

}
