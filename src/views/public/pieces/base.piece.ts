import { HostBinding, Input } from '@angular/core';
import { CrudModel } from '@wooportal/core';
import { ActivityModel } from '../../../realm/models/activity.model';
import { BlogpostModel } from '../../../realm/models/blogpost.model';
import { InfopageModel } from '../../../realm/models/infopage.model';
import { OrganisationModel } from '../../../realm/models/organisation.model';

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
