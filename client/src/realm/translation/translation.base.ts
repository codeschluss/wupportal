import { ActivatedRoute } from '@angular/router';
import { CrudModel, TokenProvider } from '@portal/core';
import { BaseForm } from '@portal/forms';
import { forkJoin, Observable } from 'rxjs';
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
    return forkJoin(this.group.get('translations').value.map((translation) => {
      const { id, ...rest } = translation;
      translation = Object.assign(Object.create(item), item, rest);
      return this.translationProvider.update(translation);
    }));
  }

}
