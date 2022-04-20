import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { BooleanPrimitive as Boolean } from '../../api/models/boolean-primitive';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { BlogControllerService as Service } from '../../api/services/blog-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { BloggerModel } from '../models/blogger.model';
import { BlogpostModel as Model } from '../models/blogpost.model';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';
import { TopicModel } from '../models/topic.model';
import { VisitableModel } from '../models/visitable.model';


@Injectable({
  providedIn: 'root'
})

export class BlogpostProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'blogger',
      method: this.service.blogControllerReadBloggerResponse,
      model: BloggerModel
    },
    {
      field: 'images',
      method: this.service.blogControllerReadImagesResponse,
      model: ImageModel
    },
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'topic',
      method: this.service.blogControllerReadTopicResponse,
      model: TopicModel
    },
    {
      field: 'titleImage',
      method: this.service.blogControllerReadTitleImageResponse,
      model: ImageModel
    },
    {
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.blogControllerReadTranslationsResponse,
      model: Model
    },
    {
      field: 'visitors',
      method: this.service.blogControllerCalculateVisitorsResponse,
      model: VisitableModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.blogControllerCreateResponse,
    delete: this.service.blogControllerDeleteResponse,
    readAll: this.service.blogControllerReadAllResponse,
    readOne: this.service.blogControllerReadOneResponse,
    update: this.service.blogControllerUpdateResponse
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

  public readAll: (params?: Service.BlogControllerReadAllParams) =>
    Observable<Model[]>;

  public analyticsVisitorsAll: () =>
    Observable<any> = this.apply(this.service
      .blogControllerCalculateOverviewVisitorsResponse);

  public grantApproval: (id: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .blogControllerGrantApprovalResponse);

  public like: (id: string, subscriptionId?: String) =>
    Observable<any> = this.apply(this.service
      .blogControllerIncreaseLikeResponse);

  public pasteImage: (id: string, image: ImageModel | null) =>
    Observable<any> = this.apply(this.service
      .blogControllerAddTitleImageResponse);

  public pasteImages: (id: string, images: ImageModel[]) =>
    Observable<any> = this.apply(this.service
      .blogControllerAddImageResponse);

  public relinkTopic: (id: string, topicId: String) =>
    Observable<any> = this.apply(this.service
      .blogControllerUpdateTopicResponse);

  public unlinkImages: (id: string, imageIds: string[]) =>
    Observable<any> = this.apply(this.service
      .blogControllerDeleteImagesResponse);

}
