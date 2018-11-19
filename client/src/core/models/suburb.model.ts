import { SuburbEntity } from '../api/models/suburb-entity';
import { BaseModel } from '../base/base.model';
import { SuburbProvider } from '../providers/suburb.provider';

export class SuburbModel
  extends BaseModel implements SuburbEntity {

  public provider = SuburbProvider;

  public name: string;

}
