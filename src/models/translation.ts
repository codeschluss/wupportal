import { Model } from 'src/models/model';

export class Translation extends Model {

  public locale: string = '';
  public name: Map<string, string>;

}
