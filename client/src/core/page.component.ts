import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NgxMdModule } from 'ngx-md';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { PageModel } from 'src/models/page.model';

@Component({
  template: `
    <nesting-component flow="column" size="md">
      <ng-template #heading>
        <h1>{{ page.title }}</h1>
      </ng-template>
      <ng-template #content>
        <ngx-md [data]="page.content"></ngx-md>
      </ng-template>
    </nesting-component>
  `
})

export class PageComponent implements OnInit, OnDestroy {

  public static readonly imports = [
    MatDividerModule,
    NgxMdModule.forRoot()
  ];

  public page: PageModel;

  private title: string;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  public constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.title = this.route.snapshot.parent.parent.data.configuration
      .find((i) => i.item === 'portalName').value;

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
      .pipe(startWith(null))
      .subscribe(() => this.navigate());
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  private navigate(): void {
    this.page = this.route.snapshot.parent.parent.data.pages
      .find((i) => i.href === this.route.snapshot.paramMap.get('page'));

    document.title = `${this.page.title} | ${this.title}`;
  }

}
