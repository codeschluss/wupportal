import { Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseService, ReadParams, StrictHttpResponse } from '../utils/api';
import { CrudModel } from './crud.model';

export interface CrudLink {
  field: string;
  method: (...args: any) => Observable<StrictHttpResponse<any>>;
  model: Type<CrudModel>;
}

export interface CrudMethods {
  create: (item: CrudModel) => Observable<StrictHttpResponse<any>>;
  delete: (id: string) => Observable<StrictHttpResponse<any>>;
  readAll: (params?: ReadParams) => Observable<StrictHttpResponse<any>>;
  readOne: (id: string) => Observable<StrictHttpResponse<any>>;
  update: (item: CrudModel, id: string) => Observable<StrictHttpResponse<any>>;
}

export abstract class CrudProvider
  <Service extends BaseService, Model extends CrudModel> {

  public system: any = Object.freeze({
    apply: this.apply.bind(this),
    based: this.based.bind(this),
    call: this.call.bind(this),
    cast: this.cast.bind(this),
    link: this.link.bind(this),

    _self: this,
    get linked(): CrudLink[] { return this._self.linked; },
    get methods(): CrudMethods { return this._self.methods; },
    get model(): Type<Model> { return this._self.model; },
    get service(): Service { return this._self.service; }
  });

  protected abstract linked: CrudLink[];

  protected abstract methods: CrudMethods;

  protected abstract model: Type<Model>;

  protected abstract service: Service;

  public create(item: Model): Observable<any> {
    return this.call(this.methods.create, item).pipe(
      map((response) => this.cast<Model[]>(response)),
      tap((response) => this.link(response)));
  }

  public delete(id: string): Observable<any> {
    return this.call(this.methods.delete, id);
  }

  public readOne(id: string): Observable<Model> {
    return this.call(this.methods.readOne, id).pipe(
      map((response) => this.cast<Model>(response)),
      tap((response) => this.link(response)));
  }

  public readAll(params?: ReadParams): Observable<Model[]> {
    return this.call(this.methods.readAll, params || { }).pipe(
      map((response) => this.cast<Model[]>(response)),
      tap((response) => this.link(response)));
  }

  public update(item: Model): Observable<any> {
    return this.call(this.methods.update, item, item.id).pipe(
      map((response) => this.cast<Model[]>(response)),
      tap((response) => this.link(response)));
  }

  protected apply(method:
    (...args: any) => Observable<StrictHttpResponse<any>>):
    (...args: any) => Observable<StrictHttpResponse<any>> {

    return (...args: any) => method.call(this.service, ...args);
  }

  protected based(model: Type<Model>): Type<Model> {
    return Object.defineProperty(model, 'provider', { value: this });
  }

  protected call(method:
    (...args: any) => Observable<StrictHttpResponse<any>>, ...args: any[]):
    Observable<StrictHttpResponse<any>> {

    return method.call(this.service, ...args);
  }

  protected cast<T>(response: StrictHttpResponse<any>, t?: Type<Model>): T {
    const caster = (item) => Object.assign(new (t || this.model)(), item);
    const data = (response.body['_embedded'] || { })['data'] || response.body;

    return Array.isArray(data)
      ? data.map((item) => caster(item))
      : caster(data);
  }

  protected link(input: Model | Model[]): void {
    const linker = (item) => this.linked.forEach((link) => {
      const data = (item._embedded || { })[link.field];
      item[link.field] = data
        ? of(Object.assign(new link.model(), data))
        : this.walk(link, item);
    });

    Array.isArray(input)
      ? input.forEach((item) => linker(item))
      : linker(input);
  }

  private walk(link: CrudLink, item: Model): Observable<any> {
    const provider = link.model['provider'];
    return provider ? this.call.apply(provider, [link.method, item.id]).pipe(
      map((response) => this.cast.apply(provider, [response, link.model])),
      tap((response) => this.link.apply(provider, [response]))) : of(null);
  }

}
