import { ErrorModel } from '../error.model';

export interface ClientErrorHandler {

  handleError(error: any): void;

  throwError(reason: ErrorModel): void;

}
