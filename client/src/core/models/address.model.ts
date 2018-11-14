import { AddressEntity } from '../api/models/address-entity';
import { AbstractModel } from './abstract.model';
import { SuburbModel } from './suburb.model';

export class AddressModel extends AbstractModel implements AddressEntity {

  public houseNumber: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postalCode: string;
  public street: string;

  public suburb: SuburbModel;

}
