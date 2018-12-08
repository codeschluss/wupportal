import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { TagControllerService } from '../../api/services/tag-controller.service';
import { TagModel } from './tag.model';

@Injectable({ providedIn: 'root' })
export class TagProvider
  extends CrudProvider<TagControllerService, TagModel> {

  public create: (model: TagModel) => Promise<any>;

  public update: (id: string, model: TagModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<TagModel>;

  public readAll: (params?: TagControllerService
    .TagControllerReadAllParams) => Promise<TagModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.tagControllerCreateResponse,
    delete: this.service.tagControllerDeleteResponse,
    readAll: this.service.tagControllerReadAllResponse,
    readOne: this.service.tagControllerReadOneResponse,
    translate: this.service.tagControllerReadTranslationsResponse,
    update: this.service.tagControllerUpdateResponse
  };

  protected model = this.based(TagModel);

  public constructor(
    protected injector: Injector,
    protected service: TagControllerService
  ) {
    super();
  }

}
