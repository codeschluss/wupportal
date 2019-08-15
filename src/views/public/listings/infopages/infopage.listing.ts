import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TopicModel } from '../../../../realm/models/topic.model';
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

}
