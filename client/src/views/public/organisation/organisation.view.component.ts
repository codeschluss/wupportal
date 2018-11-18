import { Component, Input } from '@angular/core';
import { OrganisationModel } from 'src/core/models/organisation.model';

@Component({
  selector: 'organisation-view',
  styleUrls: ['organisation.component.css'],
  templateUrl: 'organisation.view.component.html'
})

export class OrganisationViewComponent {

  public static readonly imports = [];

  @Input()
  organisation: OrganisationModel

  public panelOpenState = false;
  
  constructor(){  
  }

}
