import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  styleUrls: ['error.response.scss'],
  templateUrl: 'error.response.html'
})

export class ErrorResponseComponent implements OnInit {

  public get code(): Observable<number> {
    return this.route.params.pipe(map((params) => parseInt(params.code, 10)));
  }

  public constructor(
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.platformProvider.name === 'Server') {
      this.platformProvider.engine.response.status(this.code);
    }
  }

}
