import { Observable } from 'rxjs';
import { ActivityEntity } from '../../api/models/activity-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { AddressModel } from './address.model';
import { CategoryModel } from './category.model';
import { ImageModel } from './image.model';
import { MembershipModel } from './membership.model';
import { OrganisationModel } from './organisation.model';
import { ScheduleModel } from './schedule.model';
import { TargetGroupModel } from './target-group.model';
import { VisitableModel } from './visitable.model';

export class ActivityModel
  extends CrudModel
  implements ActivityEntity {

  @Translate() public description: string;
  @Translate() public name: string;

  public admissionFee: number;
  public contactName: string;
  public likes: number;
  public mail: string;
  public phone: string;

  public addressId: string;
  public categoryId: string;
  public organisationId: string;

  public address: AddressModel & Observable<AddressModel>;
  public category: CategoryModel & Observable<CategoryModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;
  public membership: MembershipModel & Observable<MembershipModel>;
  public organisation: OrganisationModel & Observable<OrganisationModel>;
  public schedules: ScheduleModel[] & Observable<ScheduleModel[]>;
  public targetGroups: TargetGroupModel[] & Observable<TargetGroupModel[]>;
  public titleImage: ImageModel & Observable<ImageModel>;
  public visitors: VisitableModel[] & Observable<VisitableModel[]>

  public get scheduled(): ScheduleModel | null {
    return Array.isArray(this.schedules) && this.schedules.length
      ? this.schedules
        .filter((s) => s.startDate > new Date().toISOString())
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .shift()
      : null;
  }

  // compatability
  public get image() { return this.titleImage; }
  public set image(value) { this.titleImage = value; }
  public get provider() { return this.membership; }
  public set provider(value) { this.membership = value; }

}
