import { CrudModel, Translate } from '@wooportal/core';
import { Observable } from 'rxjs';
import { BlogEntity } from '../../api/models/blog-entity';
import { ActivityModel } from './activity.model';
import { ImageModel } from './image.model';

export class BlogpostModel
  extends CrudModel implements BlogEntity {

  @Translate() public content: string;
  @Translate() public title: string;

  public author: string;
  public likes: number;

  public activityId: string;

  public activity: ActivityModel & Observable<ActivityModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;

  public get name(): string {
    return this.title;
  }

}
