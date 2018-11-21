import { AddressEntity } from '../api/models/address-entity';
import { CrudModel } from '../crud/crud.model';
import { SuburbModel } from './suburb.model';

export class AddressModel
  extends CrudModel implements AddressEntity {

  public houseNumber: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postalCode: string;
  public street: string;

  public suburb: Promise<SuburbModel>;

}
