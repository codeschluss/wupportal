import { ResourceSuburbEntity } from '../api/models/resource-suburb-entity';
import { AbstractEntity } from './abstract.entity';

export class SuburbEntity extends AbstractEntity
  implements ResourceSuburbEntity {

  public name: string;

}
