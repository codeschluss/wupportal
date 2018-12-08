import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { TagControllerService } from '../../api/services/tag-controller.service';
import { TagModel } from '../tag/tag.model';

@Injectable({ providedIn: 'root' })
export class TagProvider
  extends CrudProvider<TagControllerService, TagModel> {

  public create: (model: TagModel) => Promise<any>;

  public update: (id: string, model: TagModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<TagModel>;

  public findAll: (params?: TagControllerService
    .TagControllerReadAllParams) => Promise<TagModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.tagControllerCreateResponse,
    delete: this.service.tagControllerDeleteResponse,
    findAll: this.service.tagControllerReadAllResponse,
    findOne: this.service.tagControllerReadOneResponse,
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
