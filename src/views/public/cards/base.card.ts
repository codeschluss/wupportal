import { HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CrudModel } from '@wooportal/core';

export abstract class BaseCard<Model extends CrudModel> {

  @HostBinding('attr.base')
  public readonly base: string = 'card';

  @Input()
  public item: Model;

  public constructor(
    public router: Router
  ) { }

}
