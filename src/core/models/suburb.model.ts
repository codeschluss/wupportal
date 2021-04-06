import { SuburbEntity } from '../../api/models/suburb-entity';
import { CrudModel } from '../crud/crud.model';

export class SuburbModel
  extends CrudModel
  implements SuburbEntity {

  public name: string;

}
