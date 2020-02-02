import { Component } from '@angular/core';
import { OrganisationModel } from '../../../../base/models/organisation.model';
import { BaseCard } from '../base.card';

@Component({
  selector: 'organisation-card',
  styleUrls: ['../base.card.scss', 'organisation.card.scss'],
  templateUrl: 'organisation.card.html'
})

export class OrganisationCardComponent extends BaseCard<OrganisationModel> { }
