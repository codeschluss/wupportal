import { ResourceTagEntity } from '../api/models/resource-tag-entity';
import { AbstractEntity } from './abstract.entity';

export class TagEntity extends AbstractEntity implements ResourceTagEntity {

  public description: string;
  public name: string;

}
