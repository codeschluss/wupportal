import { Injectable, Injector, Type } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { ErrorModel } from '../utils/error.model';
import { CrudModel } from './crud.model';

interface ModelLink {
  field: string;
  method: Function;
  model: Type<CrudModel>;
}

@Injectable({ providedIn: 'root' })
export abstract class CrudService
  <Service extends BaseService, Model extends CrudModel> {

  public static readonly imports = [MatSnackBarModule];

  protected abstract injector: Injector;

  protected abstract linked: ModelLink[];

  protected abstract methods: {
    create: (model: Model) => Observable<StrictHttpResponse<object>>,
    update: (model: Model, id: string) => Observable<StrictHttpResponse<{}>>,
    delete: (id: string) => Observable<StrictHttpResponse<object>>
    findAll: (params?: object) => Observable<StrictHttpResponse<object>>,
    findOne: (id: string) => Observable<StrictHttpResponse<object>>
  };

  protected abstract model: Type<Model>;

  protected abstract service: Service;

  protected abstract snackbar: MatSnackBar;

  public apply(method:
    (...args: any) => Observable<StrictHttpResponse<object>>):
    (...args: any) => Promise<StrictHttpResponse<object>> {

    return (...args: any) => this.call(method, ...args).toPromise();
  }

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

  public findAll(params: object): Promise<Model[]> {
    return this.call(this.methods.findAll, params).pipe(
      map((response) => this.cast<Model[]>(response)),
      tap((response) => this.link(response)),
      tap((response) => this.purge(response))
    ).toPromise();
  }

  protected based(model: Type<Model>): Type<Model> {
    return Object.defineProperty(model, 'provider', {
      value: this.constructor
    });
  }

  protected call(method: Function, ...args: any[]):
    Observable<StrictHttpResponse<object>> {

    return method.call(this.service, ...args).pipe(catchError((response) => {
      const error = Object.assign(new ErrorModel(), response.error);
      this.snackbar.open(error.message, '×');
      return throwError(error);
    }));
  }

  protected cast<T>(response: StrictHttpResponse<object>, type?): T {
    const cast = (model) => Object.assign(new (type || this.model)(), model);
    const data = (response.body['_embedded'] || {})['data'] || response.body;

    return Array.isArray(data)
      ? data.map((model) => cast(model))
      : cast(data);
  }

  protected link(input: Model | Model[]): void {
    const linker = (model) => this.linked.forEach((link) => {
      const embedded = (model._embedded || {})[link.field];
      Object.defineProperty(model, link.field, { get: () => embedded
        ? Promise.resolve(Object.assign(new link.model(), embedded))
        : this.walker(link, model)
      });
    });

    Array.isArray(input)
      ? input.forEach((model) => linker(model))
      : linker(input);
  }

  protected purge(input: Model | Model[]): void {
    const purge = (model) => {
      delete model._embedded;
      delete model._links;
      return model;
    };

    Array.isArray(input)
      ? input.forEach((model) => purge(model))
      : purge(input);
  }

  private walker(link: ModelLink, model: Model): Promise<any> {
    const provider = this.injector.get((link.model as any).provider);
    return this.call.apply(provider, [link.method, model.id]).pipe(
      map((response) => this.cast.apply(provider, [response, link.model])),
      tap((response) => this.link.apply(provider, [response])),
      tap((response) => this.purge.apply(provider, [response]))
    ).toPromise();
  }

}
