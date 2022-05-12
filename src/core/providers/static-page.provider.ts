import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MarkupControllerService as Service } from '../../api/services/markup-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';
import { StaticPageModel as Model } from '../models/static-page.model';
import { VideoModel } from '../models/video.model';
import { VisitableModel } from '../models/visitable.model';

@Injectable({
  providedIn: 'root'
})

export class StaticPageProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'images',
      method: this.service.markupControllerReadImagesResponse,
      model: ImageModel
    },
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'titleImage',
      method: this.service.markupControllerReadTitleImageResponse,
      model: ImageModel
    },
    {
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.markupControllerReadTranslationsResponse,
      model: Model
    },
    {
      field: 'videos',
      method: this.service.markupControllerReadVideosResponse,
      model: VideoModel
    },
    {
      field: 'visitors',
      method: this.service.markupControllerCalculateVisitorsResponse,
      model: VisitableModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.markupControllerCreateResponse,
    delete: this.service.markupControllerDeleteResponse,
    readAll: this.service.markupControllerReadAllResponse,
    readOne: this.service.markupControllerReadOneResponse,
    update: this.service.markupControllerUpdateResponse
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

  public readAll: (params?: Service.MarkupControllerReadAllParams) =>
    Observable<Model[]>;

  public pasteImage: (id: string, image: ImageModel | null) =>
    Observable<any> = this.apply(this.service
      .markupControllerAddTitleImageResponse);

  public pasteImages: (id: string, images: ImageModel[]) =>
    Observable<any> = this.apply(this.service
      .markupControllerAddImageResponse);

  public pasteVideos: (id: string, videos: VideoModel[]) =>
    Observable<any> = this.apply(this.service
      .markupControllerAddVideosResponse);

  public unlinkImages: (id: string, imageIds: string[]) =>
    Observable<any> = this.apply(this.service
      .markupControllerDeleteImagesResponse);

  public unlinkVideos: (id: string, videoIds: string[]) =>
    Observable<any> = this.apply(this.service
      .markupControllerDeleteVideosResponse);

}
