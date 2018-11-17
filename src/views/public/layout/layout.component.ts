import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDividerModule, MatExpansionModule, MatExpansionPanel, MatSidenav, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs/operators';
// import { DefaultRoute } from 'src/client.router';
// import { PageModel } from '../../../core/models/page.model';

@Component({
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit, OnDestroy {

  public static readonly imports = [
    MatExpansionModule,
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
    // this.defaultRoute = DefaultRoute;

    // this.router.events
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
    //   .subscribe(() => this.sidenav.close());

    // this.router.events
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
    //   .pipe(map((i: NavigationEnd) => i.urlAfterRedirects))
    //   .pipe(startWith(window.location.pathname))
    //   .subscribe((i) => this.navigate(i));

    // fromEvent(this.query.nativeElement, 'keyup')
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .pipe(map((i: Event) => (<HTMLInputElement> i.target).value))
    //   .pipe(map((i) => this.escape(i)))
    //   .pipe(distinctUntilChanged())
    //   .pipe(debounceTime(1000))
    //   .subscribe((i) => this.router.navigate(['search', i || []]));
  }

  public ngOnDestroy(): void {
  //   this.ngUnsubscribe.next(null);
  //   this.ngUnsubscribe.complete();
  // }

  // public href(page: PageModel): string {
  //   return `/pages/${page.href}`;
  // }

  // public open(menu: string): void {
  //   const open = () => {
  //     switch (menu) {
  //       case 'finder': this.finder.open(); break;
  //       case 'navbar': this.navbar.open(); break;
  //       case 'paging': this.paging.open(); break;
  //     }
  //   };

  //   this.sidenav.opened ? this.sidenav.close().then(open) : open();
  // }

  // private escape(query: string): string {
  //   return query.trim().replace(/\s+/g, ' ');
  // }

  // private navigate(href: string): void {
  //   this.query.nativeElement.value = href.match(/\/search\/.+/)
  //     ? this.route.snapshot.firstChild.firstChild.params.query : '';
  }

}
