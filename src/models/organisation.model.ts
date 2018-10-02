import { AbstractModel } from 'src/models/abstract.model';
import { AddressModel } from 'src/models/address.model';

export class OrganisationModel extends AbstractModel {

  public address: AddressModel = new AddressModel();
  public address_id: string = '';
  public description: string = '';
  public image: any = null;
  public mail: string = '';
  public name: string = '';
  public phone: string = '';
  public website: string = '';

}
