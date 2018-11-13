import { ResourceAddressEntity } from '../api/models/resource-address-entity';
import { AbstractEntity } from './abstract.entity';
import { SuburbEntity } from './suburb.entity';

export class AddressEntity extends AbstractEntity
  implements ResourceAddressEntity {

  public house_number: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postal_code: string;
  public street: string;

  public suburb: SuburbEntity;

}
