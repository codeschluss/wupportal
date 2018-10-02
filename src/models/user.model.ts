import { AbstractModel } from 'src/models/abstract.model';
import { ProviderModel } from 'src/models/provider.model';

export class UserModel extends AbstractModel {

  public fullname: String;
  public password: String;
  public phone: String;
  public providers: ProviderModel[];
  public superuser: Boolean;
  public username: String;

}
