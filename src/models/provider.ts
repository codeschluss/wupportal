import { Model } from 'src/models/model';
import { Organisation } from 'src/models/organisation';
import { User } from 'src/models/user';

export class Provider extends Model {

  public admin: boolean;
  public approved: boolean;
  public organisation: Organisation;
  public user: User;
  public organisation_id: string;
  public user_id: string;

}
