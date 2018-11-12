import { AbstractEntity } from './abstract.entity';
import { OrganisationEntity } from './organisation.entity';
import { UserEntity } from './user.entity';

export class ProviderEntity extends AbstractEntity {

  public admin: boolean;
  public approved: boolean;
  public organisation: OrganisationEntity;
  // public organisation_id: string;
  public user: UserEntity;
  // public user_id: string;

}
