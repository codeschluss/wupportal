import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';
import { CategoryEntity } from '../../api/models/category-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { ActivityModel } from './activity.model';

export class CategoryModel
  extends CrudModel
  implements CategoryEntity {

  @Translate() public name: string;

  public description: string;
  public color: string;
  public icon: IconName;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;

}
