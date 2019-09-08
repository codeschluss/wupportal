import { HostBinding, Input } from '@angular/core';
import { CrudModel } from '@wooportal/core';
import { ActivityModel } from '../../../realm/models/activity.model';
import { BlogModel } from '../../../realm/models/blog.model';
import { OrganisationModel } from '../../../realm/models/organisation.model';
import { PageModel } from '../../../realm/models/page.model';

export abstract class BasePiece {

  @HostBinding('attr.base')
  public readonly base: string = 'piece';

  @Input()
  public item: CrudModel & { likes: number };

  public get namespace(): string {
    switch (this.item.constructor) {
      case ActivityModel: return 'activities';
      case BlogModel: return 'blogposts';
      case OrganisationModel: return 'organisations';
      case PageModel: return 'infopages';
    }
  }

}
