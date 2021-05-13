import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { PageControllerService as Service } from '../../api/services/page-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { InfopageModel as Model } from '../models/infopage.model';
import { LanguageModel } from '../models/language.model';
import { TopicModel } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})

export class InfopageProvider
  extends CrudProvider<Service, Model> {

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
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.pageControllerReadTranslationsResponse,
      model: Model
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.pageControllerCreateResponse,
    delete: this.service.pageControllerDeleteResponse,
    readAll: this.service.pageControllerReadAllResponse,
    readOne: this.service.pageControllerReadOneResponse,
    update: this.service.pageControllerUpdateResponse
  };

  protected model: Type<Model> = this.based(Model);

  public constructor(
    protected service: Service
  ) {
    super();
  }

  public create: (model: Partial<Model>) => Observable<any>;

  public update: (model: Partial<Model>) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<Model>;

  public readAll: (params?: Service.PageControllerReadAllParams) =>
    Observable<Model[]>;

  public like: (id: string, subscriptionId?: String) =>
    Observable<any> = this.apply(this.service
      .pageControllerIncreaseLikeResponse);

  public relinkTopic: (id: string, topicId: String) =>
    Observable<any> = this.apply(this.service
      .pageControllerUpdateTopicResponse);

}
