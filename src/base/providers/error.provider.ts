import { Injectable } from '@angular/core';
import { StrictHttpResponse } from '@wooportal/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, throttleTime } from 'rxjs/operators';
import { ErrorControllerService } from '../../api/services/error-controller.service';
import { ErrorModel } from '../models/error.model';

@Injectable({ providedIn: 'root' })
export class ErrorProvider {

  public readonly broadcast: Subject<ErrorModel> = new Subject<ErrorModel>();

  public constructor(
    private service: ErrorControllerService
  ) {
    this.broadcast.pipe(throttleTime(5000))
      .subscribe((reason) => this.throwError(reason));
  }

  public throwError(reason: ErrorModel): Observable<StrictHttpResponse<any>> {
    return this.service.errorControllerErrorResponse(reason.toString())
      .pipe(catchError(() => of(undefined)));
  }

}
