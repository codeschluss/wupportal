import { CrudModel } from '@portal/core';
import { ConfigurationEntity } from '../../api/models/configuration-entity';

export class ConfigurationModel
  extends CrudModel implements ConfigurationEntity {

  public item: string;
  public value: string;

}
