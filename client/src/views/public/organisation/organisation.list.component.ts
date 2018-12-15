import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material';
import { AddressModel } from 'src/realm/address/address.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { OrganisationProvider } from 'src/realm/organisation/organisation.provider';
import { SuburbModel } from 'src/realm/suburb/suburb.model';


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
    organisationProvider.readAll().toPromise().then((i) => {
      i.forEach(act => {
        // just for testing
        const address: any = new AddressModel;
        address.latitude = longlat;
        address.longitude = longlat;
        address.place = 'Wuppertal';
        address.postalCode = '20400';
        address.houseNumber = '2b';
        address.street = 'strassenname';

        const suburb: any = new SuburbModel;
        suburb.name = 'Elberfeld';
        address.suburb = suburb;
        act.address = address;
        this.organisations.push(act);
        longlat++;
      });
    });
  }

}
