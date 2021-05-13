import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ApiConfiguration } from '../../api/api-configuration';
import { BaseService } from '../../api/base-service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ImageModel } from '../models/image.model';
import { VideoModel as Model } from '../models/video.model';
import { BaseService as Service } from '../tools/api';

@Injectable({
  providedIn: 'root'
})

export class VideoProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'thumbnail',
      method: () => EMPTY,
      model: ImageModel
    }
  ];

  protected methods: CrudMethods;

  protected model: Type<Model> = this.based(Model);

  protected service: Service = new BaseService(this.api, this.http);

  public constructor(
    private api: ApiConfiguration,
    private http: HttpClient
  ) {
    super();
  }

}
