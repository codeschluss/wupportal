import { SuburbEntity } from '../api/models/suburb-entity';
import { AbstractModel } from './abstract.model';

export class SuburbModel extends AbstractModel implements SuburbEntity {

  public name: string;

}
