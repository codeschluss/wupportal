import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorePackage, SessionProvider } from '@portal/core';
import { ActivityProvider } from '../../realm/activity/activity.provider';
import { OrganisationProvider } from '../../realm/organisation/organisation.provider';
import { UserProvider } from '../../realm/user/user.provider';
import { ClientPackage } from '../../utils/package';

@Component({
  template: `<router-outlet></router-outlet>`
})

export class AdminComponent {

  public constructor(
    private activatedRoute: ActivatedRoute,
    private activityProvider: ActivityProvider,
    private organisationProvider: OrganisationProvider,
    private sessionProvider: SessionProvider,
    private userProvider: UserProvider,

    private clientPackage: ClientPackage,
    private corePackage: CorePackage
  ) {
    this.sessionProvider.subscribe((i) => {
      console.log('refresh_exp', i.refreshToken.exp - Date.now() / 1000);
      console.log('access__exp', i.accessToken.exp - Date.now() / 1000);
      console.log('refresh_jwt', i.refreshToken.raw);
      console.log('access__jwt', i.accessToken.raw);
    });

    console.log('PKG', this.corePackage, this.clientPackage);

    console.log(this.activatedRoute.snapshot);
    console.log(this.activityProvider);
    // console.log(this.userProvider);
    console.log(this.sessionProvider);

    this.tests();
  }

  private async tests() {
    // await this.sessionTest();
    // await this.providerTest();
    // await this.crudTest('00000000-0000-0000-0010-100000000000');
  }

  private async crudTest(id) {
    const activity = await this.activityProvider.findOne(id);
    console.log(activity); // ActivityModel { ... }

    const address = await activity.address;
    console.log(address); // AddressModel { ... }

    const suburb = await address.suburb;
    console.log(suburb); // SuburbModel { ... }
  }

  private async sessionTest() {
    await this.sessionProvider.login('super@user', 'test');
    await this.sessionProvider.refresh();
  }

  private async providerTest() {
    console.log('USERS', await this.userProvider.findAll());
    for (const user of await this.userProvider.findAll()) {
      try {
        console.log(await user.organisations);
      } catch (error) { }
    }

    console.log('ORGAS', await this.organisationProvider.findAll());
    for (const organisation of await this.organisationProvider.findAll()) {
      try {
        console.log(await organisation.users);
      } catch (error) { }
    }
  }

  // private async adminTestMethod(id) {
  //   const tag = { name: 'TAGGIDDY' } as TagModel;

  //   console.log(await (await this.activityProvider.findOne(id)).tags);
  //   await this.sessionProvider.login('super@user', 'test');
  //   await this.testMethod('00000000-0000-0000-0010-100000000000');
  //   await this.sessionProvider.refresh();
  //   await this.activityProvider.pasteTags(id, [tag]);
  //   // await this.sessionProvider.logout();
  //   console.log(await (await this.activityProvider.findOne(id)).tags);
  // }

}
