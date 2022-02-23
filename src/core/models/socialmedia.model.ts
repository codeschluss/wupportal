import { SocialMediaEntity } from 'src/api/models/social-media-entity';
import { CrudModel } from '../crud/crud.model';

export class SocialMediaModel
  extends CrudModel
  implements SocialMediaEntity {

  public name: string;
  public icon: string;
  public url: string;

}
