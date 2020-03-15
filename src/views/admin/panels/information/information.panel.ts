import { Component } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'information.panel.html'
})

export class InformationPanelComponent extends BasePanel {

  protected path: string = 'information';

  protected resolve: Record<string, CrudJoiner> = { };

}
