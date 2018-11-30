import { CrudModel } from '@portal/core';
import { CategoryEntity } from '../../api/models/category-entity';

export class CategoryModel
  extends CrudModel implements CategoryEntity {

  public color: string;
  public description: string;
  public name: string;

}
