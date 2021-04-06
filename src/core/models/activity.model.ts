import { Observable } from 'rxjs';
import { ActivityEntity } from '../../api/models/activity-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { AddressModel } from './address.model';
import { BlogpostModel } from './blogpost.model';
import { CategoryModel } from './category.model';
import { ImageModel } from './image.model';
import { KeywordModel } from './keyword.model';
import { MembershipModel } from './membership.model';
import { OrganisationModel } from './organisation.model';
import { ScheduleModel } from './schedule.model';
import { TargetGroupModel } from './target-group.model';

export class ActivityModel
  extends CrudModel
  implements ActivityEntity {

  @Translate() public description: string;
  @Translate() public name: string;

  public contactName: string;
  public likes: number;
  public mail: string;
  public phone: string;

  public addressId: string;
  public categoryId: string;
  public organisationId: string;

  public address: AddressModel & Observable<AddressModel>;
  public blogposts: BlogpostModel[] & Observable<BlogpostModel[]>;
  public category: CategoryModel & Observable<CategoryModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;
  public keywords: KeywordModel[] & Observable<KeywordModel[]>;
  public membership: MembershipModel & Observable<MembershipModel>;
  public organisation: OrganisationModel & Observable<OrganisationModel>;
  public schedules: ScheduleModel[] & Observable<ScheduleModel[]>;
  public targetGroups: TargetGroupModel[] & Observable<TargetGroupModel[]>;

  public get scheduled(): ScheduleModel | null {
    return Array.isArray(this.schedules) && this.schedules.length
      ? this.schedules
        .filter((s) => s.startDate > new Date().toISOString())
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .shift()
      : null;
  }

  // compatability
  public get provider() { return this.membership; }
  public set provider(value) { this.membership = value; }
  public get tags() { return this.keywords; }
  public set tags(value) { this.keywords = value; }
  public get blogs() { return this.blogposts; }
  public set blogs(value) { this.blogposts = value; }

}
