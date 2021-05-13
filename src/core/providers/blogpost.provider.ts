import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { BlogControllerService as Service } from '../../api/services/blog-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { BloggerModel } from '../models/blogger.model';
import { BlogpostModel as Model } from '../models/blogpost.model';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})

export class BlogpostProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'activity',
      method: this.service.blogControllerReadActivityResponse,
      model: ActivityModel
    },
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
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.blogControllerReadTranslationsResponse,
      model: Model
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

  public like: (id: string, subscriptionId?: String) =>
    Observable<any> = this.apply(this.service
      .blogControllerIncreaseLikeResponse);

  public pasteImages: (id: string, images: ImageModel[]) =>
    Observable<any> = this.apply(this.service
      .blogControllerAddImageResponse);

  public relinkActivity: (id: string, activityId: String) =>
    Observable<any> = this.apply(this.service
      .blogControllerUpdateActivityResponse);

  public unlinkImages: (id: string, imageIds: string[]) =>
    Observable<any> = this.apply(this.service
      .blogControllerDeleteImagesResponse);

}
