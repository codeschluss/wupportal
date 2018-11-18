import { TagEntity } from '../api/models/tag-entity';
import { BaseModel } from '../base/base.model';

export class TagModel
  extends BaseModel implements TagEntity {

  public description: string;
  public name: string;

}
