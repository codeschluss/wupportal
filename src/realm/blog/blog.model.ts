import { CrudModel } from '@portal/core';
import { BlogEntity } from '../../api/models/blog-entity';
import { ActivityModel } from '../activity/activity.model';
import { Observable } from 'rxjs';

export class BlogModel
  extends CrudModel implements BlogEntity {

    author: string;
    content: string;
    likes: number;
    title: string;
    created: string;

    public activity: Observable<ActivityModel[]>;

}
