import { AbstractModel } from 'src/models/abstract.model';
import { OrganisationModel } from 'src/models/organisation.model';
import { UserModel } from 'src/models/user.model';

export class ProviderModel extends AbstractModel {

  public admin: boolean;
  public approved: boolean;
  public organisation: OrganisationModel;
  public organisation_id: string;
  public user: UserModel;
  public user_id: string;

}
