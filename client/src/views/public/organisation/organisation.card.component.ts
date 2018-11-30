import { Component, Input } from '@angular/core';
import { OrganisationModel } from 'src/domain/organisation/organisation.model';


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
