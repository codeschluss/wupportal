import { Component } from '@angular/core';
import { MetatagService } from '../../../core';

@Component({
  styleUrls: ['error.netsplit.sass'],
  templateUrl: 'error.netsplit.html'
})

export class ErrorNetsplitComponent {

  public constructor(
    public metatagService: MetatagService
  ) { }

}
