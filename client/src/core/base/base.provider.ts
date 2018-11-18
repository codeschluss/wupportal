import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { BaseModel, ModelType } from '../base/base.model';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export abstract class BaseProvider
  <Service extends BaseService, Model extends BaseModel> {

  public static readonly imports = [
    MatSnackBarModule
  ];

  protected abstract linked: {
    field: string,
    method: Function,
    model: ModelType,
    multi: boolean
  }[];

  protected abstract methods: {
    findAll: Function,
    findOne: Function,
    add: Function,
    update: Function,
    delete: Function
  };

  protected abstract snackbar: MatSnackBar;

  protected abstract model: new() => Model;

  protected abstract service: Service;

  public create(model: Model): Promise<void> {
    return this.call(this.methods.add, model).pipe(
      map(() => null)
    ).toPromise();
  }

  public update(id: string, model: Model): Promise<void> {
    return this.call(this.methods.update, id, model).pipe(
      map(() => null)
    ).toPromise();
  }

  public delete(id: string): Promise<void> {
    return this.call(this.methods.delete, id).pipe(
      map(() => null)
    ).toPromise();
  }

  public findOne(id: string): Promise<Model> {
    return this.call(this.methods.findOne, id).pipe(
      map((response) => this.cast<Model>(response)),
      map((response) => this.links(response)),
      map((response) => this.purge(response))
    ).toPromise();
  }

  public findAll(
    current?: boolean,
    dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<Model[]> {
    return this.call(this.methods.findAll, ...Array.from(arguments)).pipe(
      map((response) => this.cast<Model[]>(response)),
      map((response) => this.links(response)),
      map((response) => this.purge(response))
    ).toPromise();
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
    return Array.isArray(data) ? data.map((model) => cast(model)) : cast(data);
  }

  protected links(model: Model): Model;
  protected links(models: Model[]): Model[];
  protected links(input: Model | Model[]): Model | Model[] {
    const links = (model) => this.linked.forEach((link) => {
      const data = (model._embedded || {})[link.field];
      const call = () => !data ? this.call(link.method, model.id).pipe(
        map((response) => this.cast<any>(response, link.model)),
        map((response) => this.links(response)),
        map((response) => this.purge(response))
      ).toPromise() : Promise.resolve(data);

      Object.defineProperty(model, link.field, { get: call });
    });

    Array.isArray(input) ? input.map((model) => links(model)) : links(input);
    return input;
  }

  protected purge(model: Model): Model;
  protected purge(models: Model[]): Model[];
  protected purge(input: Model | Model[]): Model | Model[] {
    const purge = (model) => {
      delete model._embedded;
      delete model._links;
      return model;
    };

    Array.isArray(input) ? input.map((model) => purge(model)) : purge(input);
    return input;
  }

}





  // protected typecast<T>(model: object, type?: new() => T): T;
  // protected typecast<T>(models: object[], type?: new() => T): T[];
  // protected typecast<T>(input: any, type?: new() => T): T | T[] {
// const cast = (model) => Object.assign(new (type || this.model)(), model);
// return Array.isArray(input) ? input.map(model => cast(model)) : cast(input);
  // }


  // protected multi(response: StrictHttpResponse<object>): object[] {
  //   return response.body['_embedded']['data'];
  // }

  // protected plain(response: StrictHttpResponse<object>): object {
  //   return response.body;
  // }

        // link.multi
        //   ? map((response) => this.multi(response))
        //   : map((response) => this.plain(response)),
