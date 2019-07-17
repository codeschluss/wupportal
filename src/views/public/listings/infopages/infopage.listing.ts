import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { TopicModel } from '../../../../realm/models/topic.model';

@Component({
  styleUrls: ['infopage.listing.scss'],
  templateUrl: 'infopage.listing.html'
})

export class InfopageListingComponent extends Selfrouter {

  protected routing: Route = {
    path: 'infopages',
    resolve: {
      infopages: CrudResolver
    },
    data: {
      resolve: {
        infopages: CrudJoiner.of(TopicModel)
      }
    }
  };

}
