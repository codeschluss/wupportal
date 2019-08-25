import { CrudModel } from '@wooportal/core';
import { ClientPackage } from '../utils/package';
import { ActivityModel } from './models/activity.model';
import { BlogModel } from './models/blog.model';
import { OrganisationModel } from './models/organisation.model';
import { PageModel } from './models/page.model';

export class RealmMap {

  private base: string = ClientPackage.config.defaults.appUrl;

  public get permalink(): string {
    return this.base + this.realm + this.item.id;
  }

  private get realm(): string {
    switch (this.item.constructor) {
      case ActivityModel: return '/activities/';
      case BlogModel: return '/blogposts/';
      case OrganisationModel: return '/organisations/';
      case PageModel: return '/infopages/';
    }
  }

  public constructor(
    private item: CrudModel
  ) { }

}
