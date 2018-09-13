import { Model } from 'src/models/model';

export class Category extends Model {

  public name: string = '';
  public description: string = '';
  public color: string = '';
  public _translations: any = {};

}
