import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@wooportal/core';

@Component({
  styleUrls: ['error.netsplit.scss'],
  templateUrl: 'error.netsplit.html'
})

export class ErrorNetsplitComponent {

  public constructor(
    public router: Router,
    public titleService: Title
  ) { }

}
