import { CrudModel } from '../crud/crud.model';

export class ProviderModel
  extends CrudModel {

  public admin: boolean;
  public approved: boolean;

}
