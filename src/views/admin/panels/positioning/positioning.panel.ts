import { Component } from '@angular/core';
import { CrudJoiner } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'positioning.panel.html'
})

export class PositioningPanelComponent
  extends BasePanel {

  protected path: string = 'positioning';

  protected resolve: Record<string, CrudJoiner> = { };

}
