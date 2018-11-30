
import { CrudModel } from '@portal/core';
import { TagEntity } from '../../api/models/tag-entity';

export class TagModel
  extends CrudModel implements TagEntity {

  public description: string;
  public name: string;

}
