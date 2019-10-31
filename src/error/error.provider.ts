import { Injectable } from '@angular/core';
import { StrictHttpResponse } from '@wooportal/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorControllerService } from '../api/services/error-controller.service';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class ErrorProvider {

  public constructor(
    private service: ErrorControllerService
  ) { }

  public throwError(reason: ErrorModel): Observable<StrictHttpResponse<any>> {
    return this.service.errorControllerErrorResponse(reason.toString())
      .pipe(catchError(() => of(undefined)));
  }

}
