import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { BaseModel } from '../base/base.model';

@Injectable({ providedIn: 'root' })
export abstract class BaseProvider
  <Service extends BaseService, Model extends BaseModel> {

  public static readonly imports = [
    MatSnackBarModule
  ];

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

  public findAll(
    current?: boolean,
    dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<Model[]> {
    return this.call(this.methods.findAll, ...Array.from(arguments)).pipe(
      map((response) => this.multiple(response)),
      map((records) => records.map((record) => this.typecast(record)))
    ).toPromise();
  }

  public findOne(id: string): Promise<Model> {
    return this.call(this.methods.findOne, id).pipe(
      map((response) => this.singular(response)),
      map((record) => this.typecast(record))
    ).toPromise();
  }

  public add(record: Model): Promise<void> {
    return this.call(this.methods.add, record).pipe(
      map(() => null)
    ).toPromise();
  }

  public update(id: string, record: Model): Promise<void> {
    return this.call(this.methods.update, id, record).pipe(
      map(() => null)
    ).toPromise();
  }

  public delete(id: string): Promise<void> {
    return this.call(this.methods.delete, id).pipe(
      map(() => null)
    ).toPromise();
  }

  protected call(method: Function, ...args: any[]):
    Observable<StrictHttpResponse<object>> {

    return method.call(this.service, ...args).pipe(
      catchError((response) => this.catch(response))
    );
  }

  protected catch(response: HttpErrorResponse): Observable<never> {
    this.snackbar.open(response.error.message, '×');
    return throwError(response.error);
  }

  protected multiple(response: StrictHttpResponse<object>): object[] {
    return response.body['_embedded']['data'];
  }

  protected singular(response: StrictHttpResponse<object>): object {
    return response.body;
  }

  protected typecast(model: object): Model {
    return Object.assign(new this.model(), model);
  }

}
