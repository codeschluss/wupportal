import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialMediaControllerService as Service } from '../../api/services/social-media-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { SocialMediaModel as Model } from '../models/social-media.model';

@Injectable({
  providedIn: 'root'
})

export class SocialMediaProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.socialMediaControllerCreateResponse,
    delete: this.service.socialMediaControllerDeleteResponse,
    readAll: this.service.socialMediaControllerReadAllResponse,
    readOne: this.service.socialMediaControllerReadOneResponse,
    update: this.service.socialMediaControllerUpdateResponse
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

  public readAll: (params?: Service.SocialMediaControllerReadAllParams) =>
    Observable<Model[]>;

}
