import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { BaseService as Service, CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY } from 'rxjs';
import { ApiConfiguration } from '../../api/api-configuration';
import { BaseService } from '../../api/base-service';
import { ImageModel } from '../models/image.model';
import { VideoModel as Model } from '../models/video.model';

@Injectable({ providedIn: 'root' })
export class VideoProvider extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'thumbnail',
      method: () => EMPTY,
      model: ImageModel
    }
  ];

  protected methods: CrudMethods;

  protected model: Type<Model> = this.based(Model);

  protected service: Service = new BaseService(this.config, this.http);

  public constructor(
    private config: ApiConfiguration,
    private http: HttpClient
  ) {
    super();
  }

}
