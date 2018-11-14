import { TagEntity } from '../api/models/tag-entity';
import { AbstractModel } from './abstract.model';

export class TagModel extends AbstractModel implements TagEntity {

  public description: string;
  public name: string;

}
