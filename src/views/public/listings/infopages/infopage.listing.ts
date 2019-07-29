import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { PageModel } from '../../../../realm/models/page.model';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.scss', 'infopage.listing.scss'],
  templateUrl: 'infopage.listing.html'
})

export class InfopageListingComponent
  extends BaseListing<PageModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(PageModel)
    .with('topic');

  protected model: Type<PageModel> = PageModel;

  protected path: string = 'infopages';

  protected size: number = 8;

}
