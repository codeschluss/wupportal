import { Observable } from 'rxjs';
import { SubscriptionEntity } from '../../api/models/subscription-entity';
import { CrudModel } from '../crud/crud.model';
import { ActivityModel } from './activity.model';
import { BloggerModel } from './blogger.model';
import { OrganisationModel } from './organisation.model';
import { SubscriptionTypeModel } from './subscription-type.model';
import { TopicModel } from './topic.model';

export class SubscriptionModel
  extends CrudModel
  implements SubscriptionEntity {

  public authSecret: string;
  public locale: string;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public bloggers: BloggerModel[] & Observable<BloggerModel[]>;
  public organisations: OrganisationModel[] & Observable<OrganisationModel[]>;
  public topics: TopicModel[] & Observable<TopicModel[]>;
  public types: SubscriptionTypeModel[] & Observable<SubscriptionTypeModel[]>;

}
