import { Component, QueryList, Type, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CrudJoiner, TopicModel } from '../../../../core';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.sass', 'infopage.listing.sass'],
  templateUrl: 'infopage.listing.html'
})

export class InfopageListingComponent
  extends BaseListing<TopicModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(TopicModel)
    .with('pages');

  protected model: Type<TopicModel> = TopicModel;

  protected path: string = 'infopages';

  protected size: number = 10;

  @ViewChildren(MatExpansionPanel)
  private expands: QueryList<MatExpansionPanel>;

  public expanded(expand: MatExpansionPanel): void {
    this.expands.filter((e) => e !== expand).forEach((e) => e.close());
  }

}
