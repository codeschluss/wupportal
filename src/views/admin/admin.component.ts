import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingProvider, Pathfinder, TokenProvider } from '@portal/core';
import { filter, map, take } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
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

export class AdminComponent implements OnInit {

  public constructor(
    public loadingProvider: LoadingProvider,
    private pathfinder: Pathfinder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    const claim = ClientPackage.config.jwtClaims.userId;
    this.tokenProvider.value
      .pipe(take(1), map((tokens) => tokens.access[claim]))
      .subscribe((userId) => this.navigate(userId));
  }

  private navigate(userId: string): void {
    if (!userId) {
      this.router.navigateByUrl('/');
    } else {
      this.tokenProvider.value
        .pipe(filter((tokens) => !tokens.refresh.raw), take(1))
          .subscribe(() => this.router.navigateByUrl('/'));

      if (!this.route.snapshot.firstChild) {
        this.router.navigate(this.pathfinder
          .to(AccountPanelComponent).concat(userId));
      }
    }
  }

}
