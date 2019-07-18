import { Component } from '@angular/core';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { BaseCard } from '../base.card';

// TODO: native image handling
// fromBase64(item.images[0].imageData);

@Component({
  selector: 'organisation-card',
  styleUrls: ['../base.card.scss', 'organisation.card.scss'],
  templateUrl: 'organisation.card.html'
})

export class OrganisationCardComponent extends BaseCard<OrganisationModel> { }
