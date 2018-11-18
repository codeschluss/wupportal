import { Component, Input } from '@angular/core';

import { AddressModel } from 'src/core/models/address.model';
import { OrganisationProvider } from 'src/core/providers/organisation.provider';
import { OrganisationModel } from 'src/core/models/organisation.model';

@Component({
    selector: 'organisation-card',
  styleUrls: ['organisation.component.css'],
  templateUrl: 'organisation.card.component.html'
})

export class OrganisationCardComponent {

  public static readonly imports = [];

  @Input()
  organisation: OrganisationModel

  constructor() {}

}
