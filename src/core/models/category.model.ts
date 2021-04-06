import { CategoryEntity } from '../../api/models/category-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';

export class CategoryModel
  extends CrudModel
  implements CategoryEntity {

  @Translate() public name: string;

  public description: string;
  public color: string;
  public icon: string;

}
