import { Component } from '@angular/core';
import { CrudJoiner } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'information.panel.html'
})

export class InformationPanelComponent
  extends BasePanel {

  protected path: string = 'information';

  protected resolve: Record<string, CrudJoiner> = { };

}
