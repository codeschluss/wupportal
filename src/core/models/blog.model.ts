import { CrudModel } from '../crud/crud.model';
import { ActivityModel } from './activity.model';
import { BlogEntity } from '../api/models/blog-entity';

export class BlogModel
  extends CrudModel implements BlogEntity {

  public title: string;
  public author: string;
  public postText: string;

  public activity: Promise<ActivityModel>;

}
