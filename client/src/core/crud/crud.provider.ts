import { Injectable, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { CrudModel } from './crud.model';

export interface CrudLink {
  field: string;
  method: (...args: any) => Observable<StrictHttpResponse<object>>;
  model: Type<CrudModel>;
}

export interface CrudMethods {
  create: (model: CrudModel) => Observable<StrictHttpResponse<object>>;
  update: (model: CrudModel, id: string) => Observable<StrictHttpResponse<{}>>;
  delete: (id: string) => Observable<StrictHttpResponse<object>>;
  findAll: (params?: object) => Observable<StrictHttpResponse<object>>;
  findOne: (id: string) => Observable<StrictHttpResponse<object>>;
}

@Injectable({ providedIn: 'root' })
export abstract class CrudProvider
  <Service extends BaseService, Model extends CrudModel> {

  public system = Object.freeze({
    apply: this.apply.bind(this),
    based: this.based.bind(this),
    call: this.call.bind(this),
    cast: this.cast.bind(this),
    link: this.link.bind(this),
    purge: this.purge.bind(this),

    _self: this,
    get linked(): CrudLink[] { return this._self.linked; },
    get methods(): CrudMethods { return this._self.methods; },
    get model(): Type<Model> { return this._self.model; },
    get service(): Service { return this._self.service; }
  });

  protected abstract injector: Injector;

  protected abstract linked: CrudLink[];

  protected abstract methods: CrudMethods;

  protected abstract model: Type<Model>;

  protected abstract service: Service;

  public create(model: Model): Promise<any> {
    return this.call(this.methods.create, model).toPromise();
  }

  public update(id: string, model: Model): Promise<any> {
    return this.call(this.methods.update, id, model).toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.call(this.methods.delete, id).toPromise();
  }

  public findOne(id: string): Promise<Model> {
    return this.call(this.methods.findOne, id).pipe(
      map((response) => this.cast<Model>(response)),
      tap((response) => this.link(response)),
      tap((response) => this.purge(response))
    ).toPromise();
  }

  public findAll(params?: object): Promise<Model[]> {
    return this.call(this.methods.findAll, params || { }).pipe(
      map((response) => this.cast<Model[]>(response)),
      tap((response) => this.link(response)),
      tap((response) => this.purge(response))
    ).toPromise();
  }

  protected apply(method:
    (...args: any) => Observable<StrictHttpResponse<object>>):
    (...args: any) => Promise<StrictHttpResponse<object>> {

    return (...args: any) => method.call(this.service, ...args).toPromise();
  }

  protected based(model: Type<Model>): Type<Model> {
    return Object.defineProperty(model, 'provider', {
      value: this.constructor
    });
  }

  protected call(method:
    (...args: any) => Observable<StrictHttpResponse<object>>, ...args: any[]):
    Observable<StrictHttpResponse<object>> {

    return method.call(this.service, ...args);
  }

  protected cast<T>(response: StrictHttpResponse<object>, t?: Type<Model>): T {
    const caster = (model) => Object.assign(new (t || this.model)(), model);
    const data = (response.body['_embedded'] || { })['data'] || response.body;

    return Array.isArray(data)
      ? data.map((model) => caster(model))
      : caster(data);
  }

  protected link(input: Model | Model[]): void {
    const linker = (model) => this.linked.forEach((link) => {
      const data = (model._embedded || { })[link.field];
      const getter = () => data
        ? Promise.resolve(Object.assign(new link.model(), data))
        : this.walker(link, model);

      Object.defineProperty(model, link.field, { get: getter });
    });

    Array.isArray(input)
      ? input.forEach((model) => linker(model))
      : linker(input);
  }

  protected purge(input: Model | Model[]): void {
    const purger = (model) => {
      delete model._embedded;
      delete model._links;
      return model;
    };

    Array.isArray(input)
      ? input.forEach((model) => purger(model))
      : purger(input);
  }

  private walker(link: CrudLink, model: Model): Promise<any> {
    if (!link.model['provider']) { return Promise.resolve(); }
    const provider = this.injector.get(link.model['provider']);
    return this.call.apply(provider, [link.method, model.id]).pipe(
      map((response) => this.cast.apply(provider, [response, link.model])),
      tap((response) => this.link.apply(provider, [response])),
      tap((response) => this.purge.apply(provider, [response]))
    ).toPromise();
  }

}
