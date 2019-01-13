import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { BlogEntity } from '../../api/models/blog-entity';
import { ActivityModel } from '../activity/activity.model';

export class BlogModel
  extends CrudModel implements BlogEntity {

    public author: string;
    public content: string;
    public likes: number;
    public title: string;

    public activityId: string;

    public activity: ActivityModel & Observable<ActivityModel>;

}
