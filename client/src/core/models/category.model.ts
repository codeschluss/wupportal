import { CategoryEntity } from '../api/models/category-entity';
import { AbstractModel } from './abstract.model';

export class CategoryModel extends AbstractModel implements CategoryEntity {

  public color: string;
  public description: string;
  public name: string;

}
