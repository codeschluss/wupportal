import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudJoiner } from '@wooportal/core';
import { ConfigurationModel } from '../../../../realm/models/configuration.model';
import { ClientPackage } from '../../../../utils/package';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './application.panel.html'
})

export class ApplicationPanelComponent extends BasePanel {

  public group: FormGroup = new FormGroup({ });

  protected path: string = 'application';

  protected resolve: object = {
    configuration: CrudJoiner.of(ConfigurationModel)
  };

  public get configuration(): ConfigurationModel[] {
    return this.route.snapshot.data.configuration || [];
  }

  public get title(): string {
    const title = this.configuration.find((c) => c.item === 'portalName');
    return title ? title.value : ClientPackage.config.defaults.title;
  }

}
