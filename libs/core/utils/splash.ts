// import { Location } from '@angular/common';
// import {
//   AfterViewInit, Component, Inject, OnDestroy, TemplateRef, ViewChild
// } from '@angular/core';
// import {
//   MatDialog, MatDialogRef, MAT_DIALOG_DATA
// } from '@angular/material/dialog';
// import { ActivatedRoute } from '@angular/router';
//
// @Component({
//   template: `
//     <ng-template #content>
//       <router-outlet></router-outlet>
//     </ng-template>
//   `
// })
//
// export class SplashHostComponent implements AfterViewInit, OnDestroy {
//
//   @ViewChild('content', { static: true })
//   private content: TemplateRef<any>;
//
//   private splash: MatDialogRef<SplashChildComponent>;
//
//   public constructor(
//     private dialog: MatDialog,
//     private location: Location,
//     private route: ActivatedRoute
//   ) { }
//
//   public ngAfterViewInit(): void {
//     if (this.route.snapshot.firstChild) {
//       this.splash = this.dialog.open(this.constructor.prototype, {
//         data: this.content,
//         maxHeight: '80vh',
//         maxWidth: '80vw'
//       });
//     } else {
//       this.location.back();
//     }
//   }
//
//   public ngOnDestroy(): void {
//     this.splash.close();
//   }
//
// }
//
// @Component({
//   template: `
//     <ng-container *ngTemplateOutlet="content"></ng-container>
//   `
// })
//
// export class SplashChildComponent {
//
//   public constructor(
//     @Inject(MAT_DIALOG_DATA) public content: TemplateRef<any>
//   ) { }
//
// }
