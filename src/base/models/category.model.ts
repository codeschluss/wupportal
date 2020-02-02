import { CrudModel, Translate } from '@wooportal/core';
import { CategoryEntity } from '../../api/models/category-entity';

export class CategoryModel
  extends CrudModel implements CategoryEntity {

  @Translate() public name: string;

  public description: string;
  public color: string;
  public icon: string;

}
