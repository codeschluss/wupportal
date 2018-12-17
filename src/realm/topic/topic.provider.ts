import { Injectable } from '@angular/core';
import { CrudProvider, CrudLink } from '@portal/core';
import { Observable, empty } from 'rxjs';
import { TopicModel } from './topic.model';
import { TopicControllerService } from 'src/api/services/topic-controller.service';
import { PageModel } from '../page/page.model';

@Injectable({ providedIn: 'root' })
export class TopicProvider
  extends CrudProvider<TopicControllerService, TopicModel> {

  public create: (model: TopicModel) => Observable<any>;

  public update: (id: string, model: TopicModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<TopicModel>;

  public readAll: (params?: TopicControllerService
    .TopicControllerReadAllParams) => Observable<TopicModel[]>;

  protected linked: CrudLink[] = [
    {
      field: 'page',
      method: () => empty(),
      model: PageModel
    }
  ];

  protected methods = {
    create: this.service.topicControllerCreateResponse,
    delete: this.service.topicControllerDeleteResponse,
    readAll: this.service.topicControllerReadAllResponse,
    readOne: this.service.topicControllerReadOneResponse,
    translate: this.service.topicControllerReadTranslationsResponse,
    update: this.service.topicControllerUpdateResponse
  };

  protected model = this.based(TopicModel);

  public constructor(
    protected service: TopicControllerService
  ) {
    super();
  }

}
