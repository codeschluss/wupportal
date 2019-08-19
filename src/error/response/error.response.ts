import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlatformProvider, Title } from '@wooportal/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  styleUrls: ['error.response.scss'],
  templateUrl: 'error.response.html'
})

export class ErrorResponseComponent implements OnInit {

  public get code(): Observable<number> {
    return this.route.params.pipe(map((params) => this.status(params)));
  }

  public constructor(
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  public ngOnInit(): void {
    this.code.subscribe((code) => this.titleService.set(`Error ${code}`));

    if (this.platformProvider.name === 'Server') {
      this.platformProvider.engine.response.status(this.status());
    }
  }

  private status(params?: Params): number {
    return parseInt((params || this.route.snapshot.params).code, 10) || 400;
  }

}
