import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { PageModel } from './page.model';
import { PageControllerService } from 'src/api/services/page-controller.service';

@Injectable({ providedIn: 'root' })
export class PageProvider
  extends CrudProvider<PageControllerService, PageModel> {

  public create: (model: PageModel) => Observable<any>;

  public update: (id: string, model: PageModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<PageModel>;

  public readAll: (params?: PageControllerService
    .PageControllerReadAllParams) => Observable<PageModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.pageControllerCreateResponse,
    delete: this.service.pageControllerDeleteResponse,
    readAll: this.service.pageControllerReadAllResponse,
    readOne: this.service.pageControllerReadOneResponse,
    translate: this.service.pageControllerReadTranslationsResponse,
    update: this.service.pageControllerUpdateResponse
  };

  protected model = this.based(PageModel);

  public constructor(
    protected service: PageControllerService
  ) {
    super();
  }

}
