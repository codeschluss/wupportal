import { HostBinding, Input } from '@angular/core';
import { CrudModel } from '@wooportal/core';

export abstract class BasePiece {

  @HostBinding('attr.base')
  public readonly base: string = 'piece';

  @Input()
  public item: CrudModel & { likes: number };

}
