import { Component, QueryList, Type, ViewChildren } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TopicModel } from '../../../../base/models/topic.model';
import { ExpandComponent } from '../../../shared/expand/expand.component';
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

  @ViewChildren(ExpandComponent)
  private expands: QueryList<ExpandComponent>;

  public expanded(expand: ExpandComponent): void {
    this.expands.filter((e) => e !== expand).forEach((e) => e.close());
  }

}
