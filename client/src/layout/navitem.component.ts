import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FlexLayoutModule, ObservableMedia } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

const imports = [
  FlexLayoutModule,
  FontAwesomeModule,
  MatButtonModule
];

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

export class NavitemComponent implements OnInit, OnDestroy {

  @Input()
  public hide: string;

  @Input()
  public href: string;

  @Input()
  public icon: string;

  public match: boolean;
  public scale: boolean;
  public small: boolean;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  constructor(
    private host: ElementRef,
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    const brand = this.route.snapshot.data.configuration
      .find((i) => i.item === 'portalName').value;

    const title = brand.includes(this.host.nativeElement.innerText)
      ? brand : this.host.nativeElement.innerText + ' » ' + brand;

    this.scale = !!this.hide && 'MAT-TOOLBAR' ===
      this.host.nativeElement.parentElement.tagName;

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
      .pipe(map((i) => i.startsWith(this.href)))
      .subscribe((i) => { if (this.match = i) { document.title = title; } });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}

Object.assign(NavitemComponent, { imports: imports });
