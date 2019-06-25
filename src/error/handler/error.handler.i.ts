import { ErrorModel } from '../error.model';

export interface ClientErrorHandler {

  throwError(error: ErrorModel): any;

}
