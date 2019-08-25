import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoadingProvider, Pathfinder, TokenProvider } from '@wooportal/core';
import { EMPTY, Subscription } from 'rxjs';
import { filter, map, mergeMap, startWith, take } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { ReloginDialogComponent } from './dialogs/relogin.dialog';
import { AccountPanelComponent } from './panels/account/account.panel';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['admin.scss'],
  template: `
    <main id="admin" [class.disabled]="loadingProvider.value | async">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AdminComponent implements OnInit, OnDestroy {

  public constructor(
    public loadingProvider: LoadingProvider,
    private dialog: MatDialog,
    private pathfinder: Pathfinder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  private base: string[];

  private homing: Subscription = EMPTY.subscribe();

  private working: Subscription = EMPTY.subscribe();

  public ngOnInit(): void {
    const claim = ClientPackage.config.jwtClaims.userId;
    const userId = this.route.snapshot.data.tokens.access[claim];
    this.base = this.pathfinder.to(AccountPanelComponent).concat(userId);

    if (userId) {
      this.home();
      this.work();
    } else {
      this.router.navigate(['/']);
    }
  }

  public ngOnDestroy(): void {
    this.homing.unsubscribe();
    this.working.unsubscribe();
  }

  private home(): void {
    this.homing = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => !this.route.firstChild.firstChild),
      startWith(!this.route.firstChild.firstChild),
      filter(Boolean)
    ).subscribe(() => this.router.navigate(this.base));
  }

  private work(): void {
    this.working = this.tokenProvider.value.pipe(
      filter((tokens) => !tokens.refresh.raw), take(1),
      mergeMap(() => this.dialog.open(ReloginDialogComponent).afterClosed()),
      filter(Boolean)
    ).subscribe(() => this.work());
  }

}
