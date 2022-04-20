import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityModel, BlogpostModel, OrganisationModel } from '../../../core';

@Component({
  styles: [`
    mat-form-field { display: block; }
    section { max-width: 100%; width: 25rem; }
  `],
  template: `
    <h2 mat-dialog-title>
      <i18n>pushNotification</i18n>
    </h2>
    <section mat-dialog-content>
      <mat-form-field>
        <mat-label><i18n>title</i18n></mat-label>
        <input matInput [formControl]="title">
      </mat-form-field>
      <mat-form-field>
        <mat-label><i18n>content</i18n></mat-label>
        <textarea matInput
          [formControl]="content"
          [matAutosizeMinRows]="3"
          [matTextareaAutosize]="true">
        </textarea>
      </mat-form-field>
    </section>
    <section mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close>
        <i18n>close</i18n>
      </button>
      <button mat-stroked-button
        color="primary"
        [disabled]="!valid"
        (click)="send()">
        <i18n>send</i18n>
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
    this.data.item.label,
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
        route = '/event/';
        break;

      case this.data.item instanceof BlogpostModel:
        route = '/story/';
        break;

      case this.data.item instanceof OrganisationModel:
        route = '/place/';
        break;
    }

    this.dialogRef.close({
      content: this.content.value,
      route: route + this.data.item.id,
      title: this.title.value
    });
  }

}
