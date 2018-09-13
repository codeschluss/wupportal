import { Model } from 'src/models/model';
import { Provider } from 'src/models/provider';

export class User extends Model {

  public superuser: Boolean;
  public username: String;
  public password: String;
  public fullname: String;
  public phone: String;
  public providers: Provider[];

}
