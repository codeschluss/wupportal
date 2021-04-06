import { LabelEntity } from '../../api/models/label-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';

export class MarkupModel
  extends CrudModel
  implements LabelEntity {

  @Translate() public content: string;

  public tagId: string;

  public get label(): string | undefined {
    return this.tagId;
  }

}
