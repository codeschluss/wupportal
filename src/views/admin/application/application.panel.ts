import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfroute } from '@portal/core';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';

@Component({
  templateUrl: './application.panel.html'
})

export class ApplicationPanelComponent extends Selfroute implements OnInit {

  public configuration: ConfigurationModel[];

  protected routing: Route = {
    path: 'application',
    component: ApplicationPanelComponent,
    resolve: {
      configuration: CrudResolver
    },
    data: {
      configuration: CrudJoiner.of(ConfigurationModel)
    }
  };

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.configuration = this.route.snapshot.data.configuration.reduce(
      (obj, conf) => Object.assign(obj, { [conf.item]: conf.value }), { });
  }

}
