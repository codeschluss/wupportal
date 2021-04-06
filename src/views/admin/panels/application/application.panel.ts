import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigurationModel, CrudJoiner } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'application.panel.html'
})

export class ApplicationPanelComponent
  extends BasePanel {

  public configurationGroup: FormGroup = new FormGroup({ });

  protected path: string = 'application';

  protected resolve: Record<string, CrudJoiner> = {
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
