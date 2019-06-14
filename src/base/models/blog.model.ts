import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { BlogEntity } from '../../api/models/blog-entity';
import { Translatable } from '../translation.base';
import { ActivityModel } from './activity.model';

export class BlogModel
  extends CrudModel implements BlogEntity {

    @Translatable() public content: string;
    @Translatable() public title: string;

    public author: string;
    public likes: number;

    public activityId: string;

    public activity: ActivityModel & Observable<ActivityModel>;

    public get name(): string {
      return this.title;
    }

}
