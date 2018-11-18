import { Component } from '@angular/core';

import { AddressModel } from 'src/core/models/address.model';
import { OrganisationProvider } from 'src/core/providers/organisation.provider';
import { OrganisationModel } from 'src/core/models/organisation.model';
import { MatExpansionModule } from '@angular/material';
import { SuburbModel } from 'src/core/models/suburb.model';

@Component({
  styleUrls: ['organisation.component.css'],
  templateUrl: 'organisation.list.component.html'
})

export class OrganisationListComponent {

  public static readonly imports = [MatExpansionModule];
  public organisations: OrganisationModel[] = [];

  constructor(
    private organisationProvider: OrganisationProvider,
  ) {
    let longlat = 0;
    organisationProvider.findAll().then((i) => {
      i.forEach(act => {
        // just for testing
        const address = new AddressModel;
        address.latitude = longlat;
        address.longitude = longlat;
        address.place = "Wuppertal";
        address.postalCode = "20400";
        address.houseNumber = "2b";
        address.street = "strassenname";

        const suburb = new SuburbModel;
        suburb.name = "Elberfeld";
        address.suburb = suburb;
        act.address = address;
        this.organisations.push(act);
        longlat++;
      })
    });
  }

}
