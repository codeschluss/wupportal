import { ActivatedRoute } from '@angular/router';
import { CrudModel, TokenProvider } from '@portal/core';
import { BaseForm } from '@portal/forms';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TranslationProvider } from './translation.provider';

export function Translatable() {
  return function(model: CrudModel, field: string): void {
    Object.defineProperty(model.constructor, 'translatable', {
      value: (model.constructor['translatable'] || []).concat(field),
      configurable: true
    });
  };
}

export abstract class TranslationBase<Model extends CrudModel>
  extends BaseForm<Model> {

  public constructor(
    private translationProvider: TranslationProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider
  ) {
    super(route, tokenProvider);
  }

  protected cascade(item: Model): Observable<any> {
    return super.cascade(item).pipe(mergeMap(() => forkJoin(
      this.group.get('translations').value.map((t) =>
        this.translationProvider.update(Object.assign(t, { id: item.id })))
    )));
  }

}
