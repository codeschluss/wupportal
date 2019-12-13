import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Headers, I18nComponent, PlatformProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  styleUrls: ['error.response.scss'],
  templateUrl: 'error.response.html'
})

export class ErrorResponseComponent implements OnInit, AfterViewInit {

  public get code(): Observable<number> {
    return this.route.params.pipe(map((params) => this.status(params)));
  }

  @ViewChild(I18nComponent, { static: true })
  private title: I18nComponent;

  public constructor(
    private headers: Headers,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.platformProvider.name === 'Server') {
      this.platformProvider.engine.response.status(this.status());
    }
  }

  public ngAfterViewInit(): void {
    this.code.subscribe((code) =>
      this.headers.setTitle(`${this.title.text}: ${code}`));
  }

  private status(params?: Params): number {
    return parseInt((params || this.route.snapshot.params).code, 10) || 400;
  }

}
