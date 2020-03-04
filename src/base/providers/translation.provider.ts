import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudModel } from '@wooportal/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { TranslationControllerService } from '../../api/services/translation-controller.service';
import { TranslationModel } from '../models/translation.model';

@Injectable({ providedIn: 'root' })
export class TranslationProvider {

  public constructor(
    private httpClient: HttpClient,
    private service: TranslationControllerService
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

  public update(item: CrudModel): Observable<any> {
    if (item.language) {
      const header = { 'Content-Language': (item.language as any).locale };
      const provider = (item.constructor as any).provider.system;
      const root = (item.constructor as any).stepper.root;

      return this.httpClient.request<any>(new HttpRequest<any>(
        'PUT',
        `${provider.service.rootUrl}/${root}/${item.id}`,
        item,
        {
          headers: new HttpHeaders(header),
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
