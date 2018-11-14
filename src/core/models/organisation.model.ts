import { OrganisationEntity } from '../api/models/organisation-entity';
import { AbstractModel } from './abstract.model';
import { AddressModel } from './address.model';

export class OrganisationModel extends AbstractModel
  implements OrganisationEntity {

  public description: string;
  public image: any;
  public mail: string;
  public name: string;
  public phone: string;
  public website: string;

  public address: AddressModel;

}
