import { Address } from 'src/models/address';
import { Model } from 'src/models/model';

export class Organisation extends Model {

  public name: string = '';
  public description: string = '';
  public website: string = '';
  public mail: string = '';
  public phone: string = '';
  public image: any = null;
  public address_id: string = '';
  public address: Address = new Address();
  public _translations: any = {};

}
