import { IconName } from '@fortawesome/fontawesome-svg-core';
import { SocialMediaEntity } from 'src/api/models/social-media-entity';
import { CrudModel } from '../crud/crud.model';

export class SocialMediaModel
  extends CrudModel
  implements SocialMediaEntity {

  public icon: IconName;
  public name: string;
  public url: string;

}
