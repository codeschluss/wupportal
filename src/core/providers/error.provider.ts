import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorControllerService as Service } from '../../api/services/error-controller.service';
import { ErrorModel } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})

export class ErrorProvider {

  public constructor(
    private service: Service
  ) { }

  public throwError(reason: ErrorModel): Observable<any> {
    return this.service.errorControllerError(reason.toString())
      .pipe(catchError(() => of(undefined)));
  }

}
