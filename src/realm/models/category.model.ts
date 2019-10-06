import { CrudModel } from '@wooportal/core';
import { CategoryEntity } from '../../api/models/category-entity';
import { Translatable } from '../translations/translatable';

export class CategoryModel
  extends CrudModel implements CategoryEntity {

  @Translatable() public name: string;

  public description: string;
  public color: string;
  public icon: string;

}
