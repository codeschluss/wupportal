import { Component } from '@angular/core';
import { CrudJoiner } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'analytics.panel.html'
})

export class AnalyticsPanelComponent
  extends BasePanel {

  protected path: string = 'analytics';

  protected resolve: Record<string, CrudJoiner> = { };

}
