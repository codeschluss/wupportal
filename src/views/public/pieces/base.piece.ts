import { HostBinding, Input } from '@angular/core';
import { CrudModel } from '@wooportal/core';
import { ActivityModel } from '../../../base/models/activity.model';
import { BlogpostModel } from '../../../base/models/blogpost.model';
import { InfopageModel } from '../../../base/models/infopage.model';
import { OrganisationModel } from '../../../base/models/organisation.model';

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
