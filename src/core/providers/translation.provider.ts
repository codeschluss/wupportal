import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { TranslationControllerService as Service } from '../../api/services/translation-controller.service';
import { CrudModel } from '../crud/crud.model';
import { TranslationModel } from '../models/translation.model';
import { CoreSettings } from '../tools/settings';

@Injectable({
  providedIn: 'root'
})

export class TranslationProvider {

  public constructor(
    private httpClient: HttpClient,
    private service: Service,
    private settings: CoreSettings
  ) { }

  public translate(
    labels: Record<string, string>,
    targets: string[],
    source: string
  ): Observable<TranslationModel[]> {
    return targets.length
      ? this.service.translationControllerTranslate(labels, targets, source)
      : of([]);
  }

  public update(
    item: CrudModel,
    root: string = (item.constructor as any).stepper.root
  ): Observable<any> {
    if (item.language) {
      const provider = (item.constructor as any).provider.system;
      const writeHeader = {
        [this.settings.labelHeader.write]: (item.language as any).locale
      };

      return this.httpClient.request<any>(new HttpRequest<any>(
        'PUT',
        `${provider.service.rootUrl}/${root}/${item.id}`,
        item,
        {
          headers: new HttpHeaders(writeHeader),
          responseType: 'json'
        }
      )).pipe(
        filter((response) => response instanceof HttpResponse),
        map((response) => provider.cast(response)),
        tap((response) => provider.link(response))
      );
    }
  }

}
