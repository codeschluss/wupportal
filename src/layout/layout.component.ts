import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatExpansionPanel, MatSidenav, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import * as fas from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

fontawesome.add(
  fas.faBars,
  fas.faCogs,
  fas.faHandshake,
  fas.faMapMarkerAlt,
  fas.faInfoCircle,
  fas.faSearch,
  fas.faTimes,
  fas.faUserCircle
);

const imports = [
  FlexLayoutModule,
  FontAwesomeModule,
  MatExpansionModule,
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatToolbarModule
];

@Component({
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('finder')
  public finder: MatExpansionPanel;

  @ViewChild('navbar')
  public navbar: MatExpansionPanel;

  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  constructor(
    public router: Router
  ) { }

  public ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe))
      .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
      .pipe(map((i: NavigationEnd) => i.urlAfterRedirects))
      .pipe(startWith(window.location.pathname))
      .subscribe((i) => {
        this.sidenav.close();
        i.startsWith('/search')
          ? this.finder.open()
          : this.navbar.open();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}

Object.assign(LayoutComponent, { imports: imports });
