import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { AddressEntity } from '../../api/models/address-entity';
import { SuburbModel } from '../suburb/suburb.model';

export class AddressModel
  extends CrudModel implements AddressEntity {

  public houseNumber: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postalCode: string;
  public street: string;

  public suburbId: string;

  public suburb: Observable<SuburbModel>;

}
