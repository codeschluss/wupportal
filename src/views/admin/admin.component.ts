import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoadingProvider, Pathfinder, TokenProvider } from '@portal/core';
import { empty, Subscription } from 'rxjs';
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

  private userId: string;

  public constructor(
    public loadingProvider: LoadingProvider,
    private dialog: MatDialog,
    private pathfinder: Pathfinder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  private navigator: Subscription = empty().subscribe();

  private worker: Subscription = empty().subscribe();

  public ngOnInit(): void {
    const claim = ClientPackage.config.jwtClaims.userId;
    const userId = this.route.snapshot.data.tokens.access[claim];
    const route = this.pathfinder.to(AccountPanelComponent).concat(userId);
    userId ? this.work() : this.router.navigateByUrl('/');

    if (userId) {
      this.navigator = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => !this.route.firstChild),
        startWith(!this.route.firstChild),
        filter(Boolean)
      ).subscribe(() => this.router.navigate(route));
    }
  }

  public ngOnDestroy(): void {
    this.navigator.unsubscribe();
    this.worker.unsubscribe();
  }

  private work(): void {
    this.worker = this.tokenProvider.value.pipe(
      filter((tokens) => !tokens.refresh.raw), take(1),
      mergeMap(() => this.dialog.open(ReloginDialogComponent).afterClosed()),
      filter(Boolean)
    ).subscribe(() => this.work());
  }

}
