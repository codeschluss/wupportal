import { CrudModel } from '../crud/crud.model';

export class BloggerModel
  extends CrudModel {

  public approved: boolean;
  public name: string;

}
