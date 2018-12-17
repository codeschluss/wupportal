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

export class RoutletterHostComponent implements AfterViewInit {

  @ViewChild('routlet')
  public routlet: TemplateRef<any>;

  public constructor(
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    if (this.route.snapshot.firstChild) {
      this.dialog.open(RoutletterChildComponent, { data: this.routlet });
    } else {
      this.location.back();
    }
  }

}

@Component({
  template: `
    <h1 mat-dialog-title>
      MAT_DIALOG
    </h1>
    <div mat-dialog-content>
      <ng-container *ngTemplateOutlet="routlet"></ng-container>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="location.back()">
        <i18n i18n="@@close">close</i18n>
      </button>
    </div>
  `
})

export class RoutletterChildComponent {

  public constructor(
    public location: Location,

    @Inject(MAT_DIALOG_DATA)
    public routlet: TemplateRef<any>
  ) { }

}
