import { Component } from '@angular/core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: './taxonomy.panel.html'
})

export class TaxonomyPanelComponent extends BasePanel {

  protected path: string = 'taxonomy';

  protected resolve: object = { };

}
