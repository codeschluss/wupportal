
import { TagEntity } from '../../api/models/tag-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';

export class KeywordModel
  extends CrudModel
  implements TagEntity {

  @Translate() public name: string;

  public description: string;

}
