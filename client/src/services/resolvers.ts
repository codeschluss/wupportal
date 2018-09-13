import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Configuration } from 'src/models/configuration';
import { AccountService } from 'src/services/services';

@Injectable()
export class I18nResolver implements Resolve<any> {

  public translation: string;

  constructor(
    private http: HttpClient,
    private user: AccountService
  ) { }

  public async resolve(): Promise<string> {
    const url = `/i18n/strings.${this.user.getLanguage()}.xlf`;
    const req = this.http.get(url, { responseType: 'text' });
    return this.translation = await req.toPromise();
  }

}

@Injectable()
abstract class Resolver<T> implements Resolve<T | T[]> {

  protected abstract readonly endpoint: string;

  constructor(
    private http: HttpClient
  ) { }

  public async resolve(route: ActivatedRouteSnapshot): Promise<T | T[]> {
    const url = this.endpoint + (route.paramMap.get('uuid') || '');
    const req = this.http.get(url, { responseType: 'text' });
    return JSON.parse(await req.toPromise());
  }

}

export class ActivityResolver  extends Resolver<Configuration> {
  protected readonly endpoint: string = '/api/activities/';
}

export class ConfigurationResolver extends Resolver<Configuration> {
  protected readonly endpoint: string = '/api/configurations/';
}
