import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudJoiner } from '@wooportal/core';
import { ConfigurationModel } from '../../../../base/models/configuration.model';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: './application.panel.html'
})

export class ApplicationPanelComponent extends BasePanel {

  public group: FormGroup = new FormGroup({ });

  protected path: string = 'application';

  protected resolve: object = {
    configuration: CrudJoiner.of(ConfigurationModel, {
      required: true
    })
  };

  public get configuration(): ConfigurationModel[] {
    return this.route.snapshot.data.configuration || [];
  }

  public get name(): string {
    const name = this.configuration.find((c) => c.item === 'portalName');
    const slug = this.configuration.find((c) => c.item === 'portalSubtitle');

    return `${name ? name.value : '...'} - ${slug ? slug.value : '...'}`;
  }

}
