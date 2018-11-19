import { TagEntity } from '../api/models/tag-entity';
import { BaseModel } from '../base/base.model';
import { TagProvider } from '../providers/tag.provider';

export class TagModel
  extends BaseModel implements TagEntity {

  public provider = TagProvider;

  public description: string;
  public name: string;

}
