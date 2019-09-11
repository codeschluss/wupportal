import { HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CrudModel } from '@wooportal/core';

export abstract class BaseCard<Model extends CrudModel> {

  @HostBinding('attr.base')
  public readonly base: string = 'card';

  @Input()
  public item: Model;

  public constructor(
    public router: Router,
    private i18n: I18n
  ) { }

  public string(id: string): string {
    return this.i18n({ id, value: id }) || id;
  }

}
