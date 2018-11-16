import { CategoryEntity } from '../api/models/category-entity';
import { BaseModel } from '../base/base.model';

export class CategoryModel extends BaseModel implements CategoryEntity {

  public color: string;
  public description: string;
  public name: string;

}
