import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { FlexLayoutModule, ObservableMedia } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { I18nComponent } from 'src/core/i18n.component';

@Component({
  selector: 'navitem-component',
  styles: [
    'button { color: inherit; font: inherit; height: inherit; width: 100%; }',
    'fa-icon { display: inline-block; text-align: center; width: 1.75em; }'
  ],
  template: `
    <button mat-button [disabled]="match" [fxHide]="small" [routerLink]="href">
      <fa-icon *ngIf="icon" [icon]="icon"></fa-icon>
      <slot [fxHide.lt-lg]="scale"><ng-content></ng-content></slot>
    </button>
  `
})

export class NavitemComponent implements AfterViewInit, OnDestroy {

  public static readonly imports = [
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule
  ];

  @Input()
  public hide: string;

  @Input()
  public href: string;

  @Input()
  public icon: string;

  public match: boolean;
  public scale: boolean;
  public small: boolean;

  @ContentChild(I18nComponent)
  private i18n: I18nComponent;

  private title: string;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  public constructor(
    private host: ElementRef,
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngAfterViewInit(): void {
    this.scale = !!this.hide && 'MAT-TOOLBAR' ===
      this.host.nativeElement.parentElement.tagName;

    this.title = this.route.snapshot.data.configuration
      .find((i) => i.item === 'portalName').value;

    this.media.asObservable()
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(startWith(null))
      .pipe(map(() => this.media.isActive(this.hide)))
      .subscribe((i) => this.small = i && this.scale);

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .pipe(filter((i: RouterEvent) => i instanceof NavigationEnd))
      .pipe(map((i: NavigationEnd) => i.urlAfterRedirects))
      .pipe(startWith(window.location.pathname))
      .subscribe((i) => this.navigate(i));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  private navigate(href: string): void {
    if ((this.match = href.startsWith(this.href)) && this.i18n) {
      document.title = `${this.i18n.value} | ${this.title}`;
    }
  }

}
