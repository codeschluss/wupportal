import { Injectable } from '@angular/core';
import { StrictHttpResponse } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ErrorControllerService } from '../api/services/error-controller.service';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class ErrorProvider {

  public constructor(
    private service: ErrorControllerService
  ) { }

  public throwError(reason: ErrorModel): Observable<StrictHttpResponse<any>> {
    return this.service.errorControllerErrorResponse(JSON.stringify(reason));
  }

}
