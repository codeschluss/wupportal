import { UserEntity } from '../api/models/user-entity';
import { AbstractModel } from './abstract.model';

export class UserModel extends AbstractModel implements UserEntity {

  public fullname: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  // public providers: ProviderModel[];

}
