import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { TopicControllerService as Service } from '../../api/services/topic-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { InfopageModel } from '../models/infopage.model';
import { LanguageModel } from '../models/language.model';
import { TopicModel as Model } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})

export class TopicProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'pages',
      method: this.service.topicControllerReadPagesResponse,
      model: InfopageModel
    },
    {
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.topicControllerReadTranslationsResponse,
      model: Model
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.topicControllerCreateResponse,
    delete: this.service.topicControllerDeleteResponse,
    readAll: this.service.topicControllerReadAllResponse,
    readOne: this.service.topicControllerReadOneResponse,
    update: this.service.topicControllerUpdateResponse
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

  public readAll: (params?: Service.TopicControllerReadAllParams) =>
    Observable<Model[]>;

}
