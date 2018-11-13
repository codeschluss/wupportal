import { ResourceConfigurationEntity } from '../api/models/resource-configuration-entity';
import { AbstractEntity } from './abstract.entity';

export class ConfigurationEntity
extends AbstractEntity
implements ResourceConfigurationEntity {

  public item: string;
  public value: string;

}
