import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class I18nResolver implements Resolve<any> {

  public translation: string;

  private user = { getLanguage: () => 'en' };

  public constructor(
    private http: HttpClient
    // private user: UserService
  ) { }

  public async resolve(): Promise<string> {
    const url = `/i18n/strings.${this.user.getLanguage()}.xlf`;
    const req = this.http.get(url, { responseType: 'text' });
    return this.translation = await req.toPromise();
  }

}
