import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LabelComponent, MetatagService, PlatformProvider } from '../../../core';

@Component({
  styleUrls: ['error.response.sass'],
  templateUrl: 'error.response.html'
})

export class ErrorResponseComponent
  implements OnInit, AfterViewInit {

  public get code(): Observable<number> {
    return this.route.params.pipe(map((params) => this.status(params)));
  }

  @ViewChild(LabelComponent, { static: true })
  private title: LabelComponent;

  public constructor(
    private metatagService: MetatagService,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.platformProvider.name === 'server') {
      this.platformProvider.response.status(this.status());
    }
  }

  public ngAfterViewInit(): void {
    this.code.subscribe((code) =>
      this.metatagService.setTitle(`${this.title.text}: ${code}`));
  }

  private status(params?: Params): number {
    return parseInt((params || this.route.snapshot.params).code, 10) || 400;
  }

}
