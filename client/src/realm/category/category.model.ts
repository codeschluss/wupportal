import { CrudModel } from '@portal/core';
import { CategoryEntity } from '../../api/models/category-entity';
import { Translatable } from '../translation/translation.base';

export class CategoryModel
  extends CrudModel implements CategoryEntity {

  @Translatable() public description: string;
  @Translatable() public name: string;

  public color: string;

}
