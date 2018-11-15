import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { AbstractModel } from '../models/abstract.model';

@Injectable({ providedIn: 'root' })
export abstract class AbstractProvider
  <Service extends BaseService, Model extends AbstractModel> {

  public static readonly imports = [
    MatSnackBarModule
  ];

  protected abstract mapping: {
    findAll: Function,
    findOne: Function,
    add: Function,
    update: Function,
    delete: Function
  };

  protected abstract model: new() => Model;

  protected abstract service: Service;

  protected abstract snackbar: MatSnackBar;

  public async findAll(): Promise<Model[]> {
    return this.call(this.mapping.findAll)
      .pipe(map((response) => this.multi(response)))
      .pipe(map((response) => response.map((object) => this.typed(object))))
      .toPromise();
  }

  public async findOne(id: string): Promise<Model> {
    return this.call(this.mapping.findOne, id)
      .pipe(map((response) => this.typed(response)))
      .toPromise();
  }

  public async add(record: Model): Promise<boolean> {
    return this.call(this.mapping.add, record)
      .pipe(map(() => true))
      .toPromise();
  }

  public async update(id: string, record: Model): Promise<boolean> {
    return this.call(this.mapping.update, id, record)
    .pipe(map(() => true))
    .toPromise();
  }

  public async delete(id: string): Promise<boolean> {
    return this.call(this.mapping.delete, id)
    .pipe(map(() => true))
    .toPromise();
  }

  // protected async findOneEmbedded(model: Model): Promise<Model> {
  //   return null;
  // }

  // protected async findAllEmbedded(model: Model): Promise<Model[]> {
  //   return null;
  // }

  protected call(method: Function, ...args: any[]): Observable<object> {
    return method.call(this.service, ...args)
      .pipe(map((response: StrictHttpResponse<object>) => {
        return response.body;
      }))
      .pipe(catchError((response: HttpErrorResponse) => {
        this.snackbar.open(response.error.message, '×');
        return throwError(response.error);
      }));
  }

  protected multi(response: object): object[] {
    return response['_embedded']['data'];
  }

  protected typed(response: object): Model {
    return Object.assign(new this.model(), response);
  }

}
