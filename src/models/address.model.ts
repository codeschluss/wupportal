import { AbstractModel } from 'src/models/abstract.model';
import { SuburbModel } from 'src/models/suburb.model';

export class AddressModel extends AbstractModel {

  public house_number: string;
  public latitude: number;
  public longitude: number;
  public place: string;
  public postal_code: string;
  public street: string;
  public suburb: SuburbModel;
  public suburb_id: string;

}
