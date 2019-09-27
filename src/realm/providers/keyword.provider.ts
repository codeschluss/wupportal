import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { TagControllerService } from '../../api/services/tag-controller.service';
import { KeywordModel } from '../models/keyword.model';
import { LanguageModel } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class KeywordProvider
  extends CrudProvider<TagControllerService, KeywordModel> {

  public create: (model: KeywordModel) => Observable<any>;

  public update: (model: KeywordModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<KeywordModel>;

  public readAll: (params?: TagControllerService
    .TagControllerReadAllParams) => Observable<KeywordModel[]>;

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'translations',
      method: this.service.tagControllerReadTranslationsResponse,
      model: KeywordModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.tagControllerCreateResponse,
    delete: this.service.tagControllerDeleteResponse,
    readAll: this.service.tagControllerReadAllResponse,
    readOne: this.service.tagControllerReadOneResponse,
    update: this.service.tagControllerUpdateResponse
  };

  protected model: Type<KeywordModel> = this.based(KeywordModel);

  public constructor(
    protected service: TagControllerService
  ) {
    super();
  }

}
