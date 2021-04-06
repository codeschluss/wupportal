import { ConfigurationEntity } from '../../api/models/configuration-entity';
import { CrudModel } from '../crud/crud.model';

export class ConfigurationModel
  extends CrudModel
  implements ConfigurationEntity {

  public item: string;
  public value: string;

}
