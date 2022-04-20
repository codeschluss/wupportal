import { Component } from '@angular/core';
import { OrganisationModel } from '../../../../core';
import { BaseCard } from '../base.card';

@Component({
  selector: 'organisation-card',
  styleUrls: ['../base.card.sass', 'organisation.card.sass'],
  templateUrl: 'organisation.card.html'
})

export class OrganisationCardComponent
  extends BaseCard<OrganisationModel> { }
