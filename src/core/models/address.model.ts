import { Observable } from 'rxjs';
import { AddressEntity } from '../../api/models/address-entity';
import { CrudModel } from '../crud/crud.model';
import { SuburbModel } from './suburb.model';

export class AddressModel
  extends CrudModel
  implements AddressEntity {

  public houseNumber: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postalCode: string;
  public street: string;

  public suburbId: string;

  public suburb: SuburbModel & Observable<SuburbModel>;

  public get label(): string {
    return `
      ${this.street}
      ${this.houseNumber},
      ${this.postalCode}
      ${this.place}
      (${this.suburb.label})
    `;
  }

}
