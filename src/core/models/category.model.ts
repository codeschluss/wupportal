import { CategoryEntity } from '../api/models/category-entity';
import { CrudModel } from '../crud/crud.model';

export class CategoryModel
  extends CrudModel implements CategoryEntity {

  public color: string;
  public description: string;
  public name: string;

}
