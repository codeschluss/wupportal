import { Component } from '@angular/core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'policies.page.scss'],
  templateUrl: 'policies.page.html'
})

export class PoliciesPageComponent extends BasePage {

  protected path: string = 'policies';

}
