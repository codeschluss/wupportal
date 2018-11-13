import { ResourceUserEntity } from '../api/models/resource-user-entity';
import { AbstractEntity } from './abstract.entity';
import { ProviderEntity } from './provider.entity';

export class UserEntity extends AbstractEntity
  implements ResourceUserEntity {

  public fullname: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  public providers: ProviderEntity[];

}
