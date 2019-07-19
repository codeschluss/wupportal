import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';

@Component({
  styleUrls: ['error.response.scss'],
  templateUrl: 'error.response.html'
})

export class ErrorResponseComponent implements OnInit {

  public code: number;

  public constructor(
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.code = parseInt(this.route.snapshot.params.code, 10) || 500;

    if (this.platformProvider.name === 'Server') {
      this.platformProvider.engine.response.status(this.code);
    }
  }

}
