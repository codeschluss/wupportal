import { Model } from 'src/models/model';
import { Suburb } from 'src/models/suburb';

export class Address extends Model {

  public latitude: number;
  public longitude: number;
  public house_number: string;
  public place: string;
  public postal_code: string;
  public street: string;
  public suburb_id: string;
  public suburb: Suburb;

}
