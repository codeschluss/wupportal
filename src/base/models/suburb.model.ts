import { CrudModel } from '@wooportal/core';
import { SuburbEntity } from '../../api/models/suburb-entity';

export class SuburbModel
  extends CrudModel implements SuburbEntity {

  public name: string;

}
