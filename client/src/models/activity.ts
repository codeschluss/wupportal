import { Address } from 'src/models/address';
import { Category } from 'src/models/category';
import { Model } from 'src/models/model';
import { Provider } from 'src/models/provider';
import { Schedule } from 'src/models/schedule';
import { Tag } from 'src/models/tag';
import { TargetGroup } from 'src/models/target-group';

export class Activity extends Model {

  public name: string = '';
  public description: string = '';
  public show_user: boolean = false;

  public address_id: string = '';
  public address: Address = new Address();
  public provider_id: string = '';
  public provider: Provider = new Provider();
  public category_id: string = '';
  public category: Category = new Category();

  public schedules: Schedule[] = [];
  public tags: Tag[] = [];
  public target_groups: TargetGroup[] = [];
  public _translations: any = {};

}
