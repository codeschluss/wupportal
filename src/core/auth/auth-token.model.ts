import { BaseModel } from '../base/base.model';

export class AuthTokenModel extends BaseModel {

  public sub: string;
  public exp: number;
  public superuser: boolean;

  public adminOrgas: string[];
  public approvedOrgas: string[];
  public createdActivities: string[];

}
