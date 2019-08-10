import { Component } from '@angular/core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'home.page.scss'],
  templateUrl: 'home.page.html'
})

export class HomePageComponent extends BasePage {

  protected path: string = '';

}
