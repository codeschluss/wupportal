import { ResourceOrganisationEntity } from '../api/models/resource-organisation-entity';
import { AbstractEntity } from './abstract.entity';
import { AddressEntity } from './address.entity';

export class OrganisationEntity extends AbstractEntity
  implements ResourceOrganisationEntity {

  public description: string;
  public image: any;
  public mail: string;
  public name: string;
  public phone: string;
  public website: string;

  public address: AddressEntity;

}
