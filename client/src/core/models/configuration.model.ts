import { ConfigurationEntity } from '../api/models/configuration-entity';
import { BaseModel } from '../base/base.model';

export class ConfigurationModel
  extends BaseModel implements ConfigurationEntity {

  public item: string;
  public value: string;

}
