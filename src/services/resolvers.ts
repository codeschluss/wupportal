import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ConfigurationModel } from 'src/models/configuration.model';
import { OrganisationModel } from 'src/models/organisation.model';
import { PageModel } from 'src/models/page.model';
import { AccountService } from 'src/services/services';

@Injectable()
export class I18nResolver implements Resolve<any> {

  public translation: string;

  public constructor(
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

  public constructor(
    protected http: HttpClient
  ) { }

  public async resolve(route: ActivatedRouteSnapshot): Promise<T | T[]> {
    const url = this.endpoint + (route.paramMap.get('uuid') || '');
    const req = route.paramMap.has('uuid')
      ? this.http.get<T>(url).toPromise()
      : this.http.get<T[]>(url).toPromise();
    return await req;
  }

}

export class ActivityResolver  extends Resolver<ConfigurationModel> {
  protected readonly endpoint: string = '/api/activities/';
  public constructor(protected http: HttpClient) { super(http); }
}

export class ConfigurationResolver extends Resolver<ConfigurationModel> {
  protected readonly endpoint: string = '/api/configurations/';
  public constructor(protected http: HttpClient) { super(http); }
}

export class OrganisationResolver extends Resolver<OrganisationModel> {
  protected readonly endpoint: string = '/api/organisations/';
  public constructor(protected http: HttpClient) { super(http); }
}

export class PageResolver extends Resolver<PageModel> {
  protected readonly endpoint: string = '/api.pages.json';
  public constructor(protected http: HttpClient) { super(http); }
}
