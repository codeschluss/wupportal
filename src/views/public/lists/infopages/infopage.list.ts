import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { TopicModel } from '../../../../realm/models/topic.model';

@Component({
  styleUrls: ['infopage.list.scss'],
  templateUrl: 'infopage.list.html'
})

export class InfopageListComponent extends Selfrouter {

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
