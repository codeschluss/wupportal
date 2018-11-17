import { BaseModel } from '../base/base.model';

export class ErrorModel extends BaseModel {

  public error: string;
  public message: string;
  public path?: string;
  public status: number;
  public timestamp: string;

}
