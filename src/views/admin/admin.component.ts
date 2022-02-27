import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { CoreSettings, JwtClaims, LoadingProvider, TokenProvider } from '../../core';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['admin.sass'],
  templateUrl: 'admin.component.html'
})

export class AdminComponent
  implements OnInit, OnDestroy {

  public break: Observable<BreakpointState>;

  public claims: Observable<JwtClaims>;

  private logout: Subscription = EMPTY.subscribe();

  public constructor(
    public loadingProvider: LoadingProvider,
    private breakpoints: BreakpointObserver,
    private router: Router,
    private settings: CoreSettings,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.break = this.breakpoints.observe('(min-width: 960px)');

    const claims = this.settings.jwtClaims;
    this.claims = this.tokenProvider.value.pipe(map((tokens) => {
      return Object.keys(claims).reduce((claim, key) => Object.assign(claim, {
        [key]: tokens.access[claims[key]]
      }), { } as JwtClaims);
    }));

    this.claims.pipe(take(1)).subscribe((claims) => {
      if (claims.userId) {
        this.logout = this.tokenProvider.value.pipe(
          filter((tokens) => !tokens.refresh.raw),
          take(1)
        ).subscribe(() => this.router.navigate(['/']));
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public ngOnDestroy(): void {
    this.logout.unsubscribe();
  }

  public active(href: string): boolean {
    return this.router.url.startsWith(href);
  }

}
