import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { OrganisationModel } from '../../../../base/models/organisation.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'organisation.object.scss'],
  templateUrl: 'organisation.object.html'
})

export class OrganisationObjectComponent extends BaseObject<OrganisationModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel, {
    required: true
  }).with('activities').yield('address').yield('suburb')
    .with('activities').yield('category')
    .with('activities').yield('schedules')
    .with('address').yield('suburb')
    .with('images');

  protected model: Type<OrganisationModel> = OrganisationModel;

  protected path: string = 'organisations';

}
