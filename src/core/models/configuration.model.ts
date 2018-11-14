import { ConfigurationEntity } from '../api/models/configuration-entity';
import { AbstractModel } from './abstract.model';

export class ConfigurationModel extends AbstractModel
  implements ConfigurationEntity {

  public item: string;
  public value: string;

}
