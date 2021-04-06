import { Component } from '@angular/core';
import { CrudJoiner } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'messaging.panel.html'
})

export class MessagingPanelComponent
  extends BasePanel {

  protected path: string = 'messaging';

  protected resolve: Record<string, CrudJoiner> = { };

}
