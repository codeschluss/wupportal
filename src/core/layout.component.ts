import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatExpansionPanel, MatSidenav, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { publicRoutes } from 'src/client.router';

@Component({
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit, OnDestroy {

  public static readonly imports = [
    FlexLayoutModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule
  ];

  @ViewChild('query')
  public query: ElementRef;

  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  public defaultRoute: string;

  @ViewChild('finder')
  private finder: MatExpansionPanel;

  @ViewChild('navbar')
  private navbar: MatExpansionPanel;

  @ViewChild('paging')
  private paging: MatExpansionPanel;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  public constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  public ngOnInit(): void {
    this.defaultRoute = publicRoutes.find((i) => i.path === '**').redirectTo;

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
      .subscribe(() => this.sidenav.close());

    fromEvent(this.query.nativeElement, 'keyup')
      .pipe(map((i: Event) => (<HTMLInputElement>i.target).value.trim()))
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(distinctUntilChanged())
      .pipe(debounceTime(1000))
      .subscribe((i) => this.search(i));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  public open(menu: string): void {
    switch (menu) {
      case 'finder': this.finder.open(); break;
      case 'navbar': this.navbar.open(); break;
      case 'paging': this.paging.open(); break;
    }

    this.sidenav.close();
  }

  public search(query: string): void {
    alert(query);
  }

}
