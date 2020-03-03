import { Component } from '@angular/core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: './analytics.panel.html',
  styleUrls: ['./analytics.panel.scss']
})

export class AnalyticsPanelComponent extends BasePanel {

  protected path: string = 'analytics';

  protected resolve: object = { };
}
