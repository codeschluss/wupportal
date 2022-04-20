import { Observable } from 'rxjs';
import { BlogpostModel, UserModel } from '..';
import { CrudModel } from '../crud/crud.model';

export class BloggerModel
  extends CrudModel {

  public approved: boolean;
  public name: string;

  public blogposts: BlogpostModel[] & Observable<BlogpostModel[]>;
  public user: UserModel & Observable<UserModel>;

  // compatability
  public get blogs() { return this.blogposts; }
  public set blogs(value) { this.blogposts = value; }

}
