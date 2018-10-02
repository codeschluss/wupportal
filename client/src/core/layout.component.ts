import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatExpansionPanel, MatSidenav, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';

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

  @ViewChild('finder')
  public finder: MatExpansionPanel;

  @ViewChild('navbar')
  public navbar: MatExpansionPanel;

  @ViewChild('paging')
  public paging: MatExpansionPanel;

  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  public constructor(
    public location: Location,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  public ngOnInit(): void {
    // this.router.events.pipe(takeUntil(this.ngUnsubscribe))
    //   .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
    //   .pipe(map((i: NavigationEnd) => i.urlAfterRedirects))
    //   .pipe(startWith(window.location.pathname))
    //   .subscribe((i) => {
    //     this.sidenav.close();
    //     i.startsWith('/search')
    //       ? this.finder.open()
    //       : this.navbar.open();
    //   });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
