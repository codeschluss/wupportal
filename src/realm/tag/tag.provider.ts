import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty, Observable } from 'rxjs';
import { TagControllerService } from '../../api/services/tag-controller.service';
import { LanguageModel } from '../language/language.model';
import { TagModel } from './tag.model';

@Injectable({ providedIn: 'root' })
export class TagProvider
  extends CrudProvider<TagControllerService, TagModel> {

  public create: (model: TagModel) => Observable<any>;

  public update: (model: TagModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<TagModel>;

  public readAll: (params?: TagControllerService
    .TagControllerReadAllParams) => Observable<TagModel[]>;

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => empty(),
      model: LanguageModel
    },
    {
      field: 'translations',
      method: this.service.tagControllerReadTranslationsResponse,
      model: TagModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.tagControllerCreateResponse,
    delete: this.service.tagControllerDeleteResponse,
    readAll: this.service.tagControllerReadAllResponse,
    readOne: this.service.tagControllerReadOneResponse,
    update: this.service.tagControllerUpdateResponse
  };

  protected model: Type<TagModel> = this.based(TagModel);

  public constructor(
    protected service: TagControllerService
  ) {
    super();
  }

}
