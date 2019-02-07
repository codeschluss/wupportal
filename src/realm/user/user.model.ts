import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../../api/models/user-entity';
import { ActivityModel } from '../activity/activity.model';
import { BlogModel } from '../blog/blog.model';
import { BloggerModel } from '../blogger/blogger.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';

export class UserModel
  extends CrudModel implements UserEntity {

  public applyBlogger: boolean;
  public name: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public blogger: BloggerModel & Observable<BloggerModel>;
  public blogs: BlogModel[] & Observable<BlogModel[]>;
  public organisations: OrganisationModel[] & Observable<OrganisationModel[]>;
  public provider: ProviderModel & Observable<ProviderModel>;
  public providers: ProviderModel[] & Observable<ProviderModel[]>;

}
