import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ActivityEntity } from '../../api/models/activity-entity';
import { AddressModel } from '../models/address.model';
import { Translatable } from '../translations/translatable';
import { BlogpostModel } from './blogpost.model';
import { CategoryModel } from './category.model';
import { KeywordModel } from './keyword.model';
import { OrganisationModel } from './organisation.model';
import { ProviderModel } from './provider.model';
import { ScheduleModel } from './schedule.model';
import { TargetGroupModel } from './target-group.model';

export class ActivityModel
  extends CrudModel implements ActivityEntity {

  @Translatable() public description: string;
  @Translatable() public name: string;

  public contactName: string;
  public likes: number;
  public mail: string;
  public phone: string;

  public addressId: string;
  public categoryId: string;
  public organisationId: string;

  public address: AddressModel & Observable<AddressModel>;
  public category: CategoryModel & Observable<CategoryModel>;
  public organisation: OrganisationModel & Observable<OrganisationModel>;
  public provider: ProviderModel & Observable<ProviderModel>;
  public schedules: ScheduleModel[] & Observable<ScheduleModel[]>;
  public tags: KeywordModel[] & Observable<KeywordModel[]>;
  public blogs: BlogpostModel[] & Observable<BlogpostModel[]>;
  public targetGroups: TargetGroupModel[] & Observable<TargetGroupModel[]>;

  public get dates(): ScheduleModel[] {
    return !this.schedules ? [] : this.schedules
      .filter((s) => +new Date(s.startDate) > +new Date())
      .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  }

}
