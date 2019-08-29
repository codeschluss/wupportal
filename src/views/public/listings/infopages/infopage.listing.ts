import { Component, QueryList, Type, ViewChildren } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TopicModel } from '../../../../realm/models/topic.model';
import { ExpandCompatComponent } from '../../../shared/compat/expand/expand.compat';
import { ExpandCompat } from '../../../shared/compat/expand/expand.compat.i';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.scss', 'infopage.listing.scss'],
  templateUrl: 'infopage.listing.html'
})

export class InfopageListingComponent
  extends BaseListing<TopicModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(TopicModel)
    .with('pages');

  protected model: Type<TopicModel> = TopicModel;

  protected path: string = 'infopages';

  protected size: number = 10;

  @ViewChildren(ExpandCompatComponent)
  private expands: QueryList<ExpandCompat>;

  public expanded(expand: ExpandCompat): void {
    this.expands.filter((e) => e !== expand).forEach((e) => e.close());
  }

}
