import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { BlogEntity } from '../../api/models/blog-entity';
import { ActivityModel } from '../activity/activity.model';
import { Translatable } from '../translation/translation.base';

export class BlogModel
  extends CrudModel implements BlogEntity {

    @Translatable() public content: string;
    @Translatable() public title: string;

    public author: string;
    public likes: number;

    public activityId: string;

    public activity: ActivityModel & Observable<ActivityModel>;

}
