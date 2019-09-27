import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorControllerService } from '../api/services/error-controller.service';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class ErrorProvider {

  public constructor(
    private service: ErrorControllerService
  ) { }

  public throwError(reason: ErrorModel): Observable<any> {
    return this.service.errorControllerErrorResponse(reason.toString());
  }

}
