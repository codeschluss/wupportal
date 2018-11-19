import { ConfigurationEntity } from '../api/models/configuration-entity';
import { BaseModel } from '../base/base.model';
import { ConfigurationProvider } from '../providers/configuration.provider';

export class ConfigurationModel
  extends BaseModel implements ConfigurationEntity {

  public provider = ConfigurationProvider;

  public item: string;
  public value: string;

}
