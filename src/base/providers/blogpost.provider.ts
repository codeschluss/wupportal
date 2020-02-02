import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { BlogControllerService } from '../../api/services/blog-controller.service';
import { ActivityModel } from '../models/activity.model';
import { BlogpostModel } from '../models/blogpost.model';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class BlogpostProvider
  extends CrudProvider<BlogControllerService, BlogpostModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activity',
      method: this.service.blogControllerReadActivityResponse,
      model: ActivityModel
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
      field: 'translations',
      method: this.service.blogControllerReadTranslationsResponse,
      model: BlogpostModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.blogControllerCreateResponse,
    delete: this.service.blogControllerDeleteResponse,
    readAll: this.service.blogControllerReadAllResponse,
    readOne: this.service.blogControllerReadOneResponse,
    update: this.service.blogControllerUpdateResponse
  };

  protected model: Type<BlogpostModel> = this.based(BlogpostModel);

  public constructor(
    protected service: BlogControllerService
  ) {
    super();
  }

  public create: (model: BlogpostModel) => Observable<any>;

  public update: (model: BlogpostModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<BlogpostModel>;

  public readAll: (params?: BlogControllerService
    .BlogControllerReadAllParams) => Observable<BlogpostModel[]>;

  public like:
    (id: string) => Observable<any> =
      this.apply(this.service.blogControllerIncreaseLikeResponse);

  public pasteImages:
    (id: string, images: ImageModel[]) => Observable<any> =
      this.apply(this.service.blogControllerAddImageResponse);

  public relinkActivity:
    (id: string, activityId: String) => Observable<any> =
      this.apply(this.service.blogControllerUpdateActivityResponse);

  public unlinkImages:
    (id: string, imageIds: string[]) => Observable<any> =
      this.apply(this.service.blogControllerDeleteImagesResponse);

}
