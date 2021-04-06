import { Component, Type } from '@angular/core';
import { CrudJoiner, OrganisationModel } from '../../../../core';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.sass', 'organisation.object.sass'],
  templateUrl: 'organisation.object.html'
})

export class OrganisationObjectComponent
  extends BaseObject<OrganisationModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel, {
    required: true
  }).with('activities').yield('address').yield('suburb')
    .with('activities').yield('category')
    .with('activities').yield('schedules')
    .with('address').yield('suburb')
    .with('images')
    .with('videos').yield('thumbnail');

  protected model: Type<OrganisationModel> = OrganisationModel;

  protected path: string = 'organisations';

}
