import { SuburbEntity } from '../api/models/suburb-entity';
import { BaseModel } from '../base/base.model';

export class SuburbModel extends BaseModel
  implements SuburbEntity {

  public name: string;

}
