import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityModel } from '../../../base/models/activity.model';
import { BlogpostModel } from '../../../base/models/blogpost.model';
import { InfopageModel } from '../../../base/models/infopage.model';
import { OrganisationModel } from '../../../base/models/organisation.model';

@Component({
  styles: [`
    mat-form-field { display: block; }
    section { width: 25rem; }
  `],
  template: `
    <h2 mat-dialog-title>
      <i18n i18n="@@pushNotification">pushNotification</i18n>
    </h2>
    <section mat-dialog-content>
      <mat-form-field>
      <mat-label><i18n i18n="@@title">title</i18n></mat-label>
        <input matInput [formControl]="title">
      </mat-form-field>
      <mat-form-field>
      <mat-label><i18n i18n="@@content">content</i18n></mat-label>
        <textarea matInput matTextareaAutosize
          [formControl]="content"
          [matAutosizeMinRows]="3">
        </textarea>
      </mat-form-field>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close>
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-button color="primary" [disabled]="!valid" (click)="send()">
        <i18n i18n="@@send">send</i18n>
      </button>
    </section>
  `
})

export class PusherPopupComponent {

  public content: FormControl = new FormControl(
    (this.data.item.content || this.data.item.description || '')
      .replace(/&#\d+;/g, (i) => String.fromCharCode(i.match(/\d+/g)[0] as any))
      .replace(/<br>/g, '\n').replace(/<[^>]*>/g, ''),
    [
      Validators.required
    ]
  );

  public title: FormControl = new FormControl(
    this.data.item.name,
    [
      Validators.required
    ]
  );

  public get valid(): boolean {
    return this.content.valid && this.title.valid;
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PusherPopupComponent>
  ) { }

  public send(): void {
    let route; switch (true) {
      case this.data.item instanceof ActivityModel:
        route = '/activities/';
        break;

      case this.data.item instanceof BlogpostModel:
        route = '/blogposts/';
        break;

      case this.data.item instanceof InfopageModel:
        route = '/infopages/';
        break;

      case this.data.item instanceof OrganisationModel:
        route = '/organisations/';
        break;
    }

    this.dialogRef.close({
      content: this.content.value,
      route: route + this.data.item.id,
      title: this.title.value
    });
  }

}
