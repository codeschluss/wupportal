import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@wooportal/core';

@Component({
  styleUrls: ['error.netsplit.scss'],
  templateUrl: 'error.netsplit.html'
})

export class ErrorNetsplitComponent {

  public constructor(
    public headers: Headers,
    public router: Router
  ) { }

}
