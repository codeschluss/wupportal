import { Location } from '@angular/common';
import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <ng-template #routlet>
      <router-outlet></router-outlet>
    </ng-template>
  `
})

export class SplashHostComponent implements AfterViewInit {

  @ViewChild('routlet')
  public routlet: TemplateRef<any>;

  public constructor(
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    if (this.route.snapshot.firstChild) {
      this.dialog.open(SplashChildComponent, {
        data: this.routlet,
        maxHeight: '80vh',
        maxWidth: '80vw',
        minHeight: '80vh',
        minWidth: '80vw'
      }).afterClosed().subscribe(() => this.location.back());
    } else {
      this.location.back();
    }
  }

}

@Component({
  template: `
    <ng-container *ngTemplateOutlet="routlet"></ng-container>
  `
})

export class SplashChildComponent {

  public constructor(
    public location: Location,

    @Inject(MAT_DIALOG_DATA)
    public routlet: TemplateRef<any>
  ) { }

}
