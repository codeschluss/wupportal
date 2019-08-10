import { Component } from '@angular/core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'imprint.page.scss'],
  templateUrl: 'imprint.page.html'
})

export class ImprintPageComponent extends BasePage {

  protected path: string = 'imprint';

}
