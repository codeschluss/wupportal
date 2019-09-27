import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { PageControllerService } from '../../api/services/page-controller.service';
import { InfopageModel } from '../models/infopage.model';
import { LanguageModel } from '../models/language.model';
import { TopicModel } from '../models/topic.model';

@Injectable({ providedIn: 'root' })
export class InfopageProvider
  extends CrudProvider<PageControllerService, InfopageModel> {

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'topic',
      method: this.service.pageControllerReadTopicResponse,
      model: TopicModel
    },
    {
      field: 'translations',
      method: this.service.pageControllerReadTranslationsResponse,
      model: InfopageModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.pageControllerCreateResponse,
    delete: this.service.pageControllerDeleteResponse,
    readAll: this.service.pageControllerReadAllResponse,
    readOne: this.service.pageControllerReadOneResponse,
    update: this.service.pageControllerUpdateResponse
  };

  protected model: Type<InfopageModel> = this.based(InfopageModel);

  public constructor(
    protected service: PageControllerService
  ) {
    super();
  }

  public create: (model: InfopageModel) => Observable<any>;

  public update: (model: InfopageModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<InfopageModel>;

  public readAll: (params?: PageControllerService
    .PageControllerReadAllParams) => Observable<InfopageModel[]>;

  public relinkTopic:
    (id: string, topicId: String) => Observable<any> =
      this.apply(this.service.pageControllerUpdateTopicResponse);

}
