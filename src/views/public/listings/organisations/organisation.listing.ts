import { Component, Type } from '@angular/core';
import { CrudJoiner, OrganisationModel } from '../../../../core';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['../base.listing.sass', 'organisation.listing.sass'],
  templateUrl: 'organisation.listing.html'
})

export class OrganisationListingComponent
  extends BaseListing<OrganisationModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb')
    .with('images');

  protected model: Type<OrganisationModel> = OrganisationModel;

  protected path: string = 'organisations';

  protected size: number = 8;

}
