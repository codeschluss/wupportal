import { HostBinding, Input } from '@angular/core';
import { CrudModel } from '@wooportal/core';

export abstract class BasePiece {

  @HostBinding('class')
  public readonly class: string = 'base-piece';

  @Input()
  public item: CrudModel & { likes: number };

}
