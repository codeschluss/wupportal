import { AbstractModel } from 'src/models/abstract.model';
import { AddressModel } from 'src/models/address.model';
import { CategoryModel } from 'src/models/category.model';
import { ProviderModel } from 'src/models/provider.model';
import { ScheduleModel } from 'src/models/schedule.model';
import { TagModel } from 'src/models/tag.model';
import { TargetGroupModel } from 'src/models/target-group.model';

export class ActivityModel extends AbstractModel {

  public address: AddressModel = new AddressModel();
  public address_id: string = '';
  public category: CategoryModel = new CategoryModel();
  public category_id: string = '';
  public description: string = '';
  public name: string = '';
  public provider: ProviderModel = new ProviderModel();
  public provider_id: string = '';
  public schedules: ScheduleModel[] = [];
  public show_user: boolean = false;
  public tags: TagModel[] = [];
  public target_groups: TargetGroupModel[] = [];

}
