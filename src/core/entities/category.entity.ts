import { ResourceCategoryEntity } from '../api/models/resource-category-entity';
import { AbstractEntity } from './abstract.entity';

export class CategoryEntity extends AbstractEntity
  implements ResourceCategoryEntity {

  public color: string;
  public description: string;
  public name: string;

}
