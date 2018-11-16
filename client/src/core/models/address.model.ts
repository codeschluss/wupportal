import { AddressEntity } from '../api/models/address-entity';
import { BaseModel } from '../base/base.model';
import { SuburbModel } from './suburb.model';

export class AddressModel extends BaseModel implements AddressEntity {

  public houseNumber: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postalCode: string;
  public street: string;

  public suburb: SuburbModel;

}
