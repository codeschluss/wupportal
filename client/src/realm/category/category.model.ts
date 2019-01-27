import { CrudModel } from '@portal/core';
import { CategoryEntity } from '../../api/models/category-entity';
import { Translatable } from '../translation/translation.base';

export class CategoryModel
  extends CrudModel implements CategoryEntity {

  @Translatable() public name: string;

  public description: string;

  public color: string;

}
