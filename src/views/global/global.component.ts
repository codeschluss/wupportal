import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterEvent } from '@angular/router';
import { debounceTime, filter, map, startWith, take } from 'rxjs/operators';
import { LabelResolver, LoadingProvider, MetatagService, PlatformProvider } from '../../core';

@Component({
  selector: 'global-component',
  template: `
    <header-component></header-component>
    <router-outlet></router-outlet>
    <footer-component></footer-component>
  `
})

export class GlobalComponent
  implements OnInit {

  public constructor(
    private labelResolver: LabelResolver,
    private loadingProvider: LoadingProvider,
    private metatagService: MetatagService,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      map((event) => event.url),
      startWith(this.router.url)
    ).subscribe((url) => this.transition(url));

    if (this.route.snapshot.queryParamMap.has('embed')) {
      this.platformProvider.document.body.classList.add('embedded');
    }

    if (['android', 'ios'].includes(this.platformProvider.name)) {
      this.loadingProvider.value.pipe(
        debounceTime(500),
        filter((count) => !count),
        take(1)
      ).subscribe(() => {
        this.platformProvider.navigator.splashscreen?.hide();
      });
    }
  }

  private transition(url: string): void {
    let path = url.replace(/\?.*$/, '').slice(1).split('/')[0];

    if (!path) {
      return this.metatagService.setTitle(null);
    } else if (path !== 'admin') {
      path = this.labelResolver.lookup(path);
      return this.metatagService.setTitle(path);
    }
  }

}
