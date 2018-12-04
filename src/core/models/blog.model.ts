import { BlogEntity } from '../api/models/blog-entity';
import { CrudModel } from '@portal/core';
import { ActivityModel } from 'src/realm/activity/activity.model';

export class BlogModel
  extends CrudModel implements BlogEntity {

  public title: string;
  public author: string;
  public postText: string;
  public creationDate: string;

  public activity: Promise<ActivityModel>;

}
