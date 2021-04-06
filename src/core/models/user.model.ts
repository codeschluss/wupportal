import { Observable } from 'rxjs';
import { UserEntity } from '../../api/models/user-entity';
import { CrudModel } from '../crud/crud.model';
import { ActivityModel } from './activity.model';
import { BloggerModel } from './blogger.model';
import { BlogpostModel } from './blogpost.model';
import { MembershipModel } from './membership.model';
import { OrganisationModel } from './organisation.model';

export class UserModel
  extends CrudModel
  implements UserEntity {

  public applyBlogger: boolean;
  public name: string;
  public organisationRegistrations: string[];
  public password: string;
  public phone: string;
  public superuser: boolean;
  public translator: boolean;
  public username: string;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public blogger: BloggerModel & Observable<BloggerModel>;
  public blogposts: BlogpostModel[] & Observable<BlogpostModel[]>;
  public membership: MembershipModel & Observable<MembershipModel>;
  public memberships: MembershipModel[] & Observable<MembershipModel[]>;
  public organisations: OrganisationModel[] & Observable<OrganisationModel[]>;

  // compatability
  public get blogs() { return this.blogposts; }
  public set blogs(value) { this.blogposts = value; }
  public get provider() { return this.membership; }
  public set provider(value) { this.membership = value; }
  public get providers() { return this.memberships; }
  public set providers(value) { this.memberships = value; }

}
