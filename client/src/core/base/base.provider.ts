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

  protected abstract model: new() => Model;

  protected abstract service: Service;

  protected abstract snackbar: MatSnackBar;

  public async findAll(
    current?: boolean,
    dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string
  ): Promise<Model[]> {
    const args = [current, dir, filter, page, size, sort];
    return this.call(this.methods.findAll, ...args).pipe(
      map((res) => this.eject(res)),
      map((res) => res.map((object) => this.typed(object)))
    ).toPromise();
  }

  public async findOne(id: string): Promise<Model> {
    return this.call(this.methods.findOne, id).pipe(
      map((res) => this.typed(res))
    ).toPromise();
  }

  public async add(record: Model): Promise<boolean> {
    return this.call(this.methods.add, record).pipe(
      map(() => true)
    ).toPromise();
  }

  public async update(id: string, record: Model): Promise<boolean> {
    return this.call(this.methods.update, id, record).pipe(
      map(() => true)
    ).toPromise();
  }

  public async delete(id: string): Promise<boolean> {
    return this.call(this.methods.delete, id).pipe(
      map(() => true)
    ).toPromise();
  }

  // protected async findOneEmbedded(model: Model): Promise<Model> {
  //   return null;
  // }

  // protected async findAllEmbedded(model: Model): Promise<Model[]> {
  //   return null;
  // }

  protected call(method: Function, ...args: any[]): Observable<object> {
    return method.call(this.service, ...args).pipe(
      map((res: StrictHttpResponse<object>) => res.body),
      catchError((res: HttpErrorResponse) => this.catch(res))
    );
  }

  protected catch(res: HttpErrorResponse): Observable<never> {
    this.snackbar.open(`${res.error.error}: ${res.error.message}`, '×');
    return throwError(res.error);
  }

  protected eject(res: object): object[] {
    return res['_embedded']['data'];
  }

  protected typed(res: object): Model {
    return Object.assign(new this.model(), res);
  }

}
