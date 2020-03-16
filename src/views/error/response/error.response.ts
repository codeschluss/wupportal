import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceProvider } from '@wooportal/app';
import { Headers } from '@wooportal/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nComponent } from '../../shared/i18n/i18n.component';

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
    private deviceProvider: DeviceProvider,
    private headers: Headers,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.deviceProvider.notation === 'Server') {
      this.deviceProvider.frontend.response.status(this.status());
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