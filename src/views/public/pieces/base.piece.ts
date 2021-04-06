import { Directive, HostBinding, Input } from '@angular/core';
import { ActivityModel, BlogpostModel, CrudModel, InfopageModel, OrganisationModel } from '../../../core';

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BasePiece {

  @HostBinding('attr.base')
  public readonly base: string = 'piece';

  @Input()
  public item: CrudModel & { likes: number };

  public get namespace(): string {
    switch (this.item.constructor) {
      case ActivityModel: return 'activities';
      case BlogpostModel: return 'blogposts';
      case InfopageModel: return 'infopages';
      case OrganisationModel: return 'organisations';
    }
  }

}
