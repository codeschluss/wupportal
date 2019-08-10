import { Component } from '@angular/core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'register.page.scss'],
  templateUrl: 'register.page.html'
})

export class RegisterPageComponent extends BasePage {

  protected path: string = 'register';

}
