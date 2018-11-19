import { CategoryEntity } from '../api/models/category-entity';
import { BaseModel } from '../base/base.model';
import { CategoryProvider } from '../providers/category.provider';

export class CategoryModel
  extends BaseModel implements CategoryEntity {

  public provider = CategoryProvider;

  public color: string;
  public description: string;
  public name: string;

}
