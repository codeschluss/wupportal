import { TagEntity } from '../api/models/tag-entity';
import { CrudModel } from '../crud/crud.model';

export class TagModel
  extends CrudModel implements TagEntity {

  public description: string;
  public name: string;

}
