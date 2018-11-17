import { UserEntity } from '../api/models/user-entity';
import { BaseModel } from '../base/base.model';

export class UserModel extends BaseModel
  implements UserEntity {

  public fullname: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  // public providers: ProviderModel[];

}
