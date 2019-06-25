import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter, SessionProvider } from '@wooportal/core';
import { OrganisationModel } from '../../../../realm/models/organisation.model';

@Component({
  styleUrls: ['organisation.list.scss'],
  templateUrl: 'organisation.list.html'
})

export class OrganisationListComponent extends Selfrouter {

  protected routing: Route = {
    path: 'organisations',
    resolve: {
      organisations: CrudResolver
    },
    data: {
      organisations: CrudJoiner.of(OrganisationModel)
        .with('address').yield('suburb')
        .with('images')
    }
  };

  public get items(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  public constructor(
    private sessionProvider: SessionProvider,
    private route: ActivatedRoute
  ) {
    super();

    // TODO: native image handling without compiler bail
    // case 'Native': return fromBase64(item.images[0].imageData);
  }

  public like(item: OrganisationModel): void {
    this.sessionProvider.like(item.id);
  }

  public liked(item: OrganisationModel): boolean {
    return this.sessionProvider.isLiked(item.id);
  }

  public share(item: OrganisationModel): void {
    console.log(`share: ${item.id}`);
  }

}
