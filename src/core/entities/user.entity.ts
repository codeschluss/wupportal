import { AbstractEntity } from './abstract.entity';
import { ProviderEntity } from './provider.entity';

export class UserEntity extends AbstractEntity {

  public fullname: String;
  public password: String;
  public phone: String;
  public providers: ProviderEntity[];
  public superuser: Boolean;
  public username: String;

}
