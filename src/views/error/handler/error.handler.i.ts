import { ErrorModel } from '../../../base/models/error.model';

export interface ClientErrorHandler {

  handleError(error: any): void;

  throwError(reason: ErrorModel): void;

}
