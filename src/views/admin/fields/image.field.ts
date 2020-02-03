import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Base64 } from '@wooportal/core';
import { fromEvent } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ImageModel } from '../../../base/models/image.model';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    :host {
      align-items: center;
      display: flex; flex-wrap: wrap;
    }
    img {
      background-position: center;
      background-size: cover;
      display: block;
      height: 15rem;
    }
    input[type=file] { display: none; }
    label {
      align-items: center;
      border: .05rem dotted rgba(0, 0, 0, 0.87);
      cursor: pointer;
      display: flex;
      height: 12.5rem;
      justify-content: center;
      margin: 0 0 1rem !important;
      width: auto !important;
    }
    label > i18n {
      pointer-events: none;
    }
    mat-card {
      display: inline-block;
      margin: .5rem; width: 25rem;
    }
    mat-form-field::ng-deep > .mat-form-field-wrapper {
      margin-bottom: -1.25rem;
    }
  `],
  template: `
    <ng-container *ngFor="let item of value">
      <mat-card>
        <img mat-card-image [style.backgroundImage]="item.source">
        <mat-card-content>{{ item.caption }}</mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions>
          <button mat-button color="warn" (click)="delete(item)">
            <i18n i18n="@@delete">delete</i18n>
          </button>
          <button mat-button
            [disabled]="caption.value || image"
            (click)="edit(item)">
            <i18n i18n="@@edit">edit</i18n>
          </button>
        </mat-card-actions>
      </mat-card>
    </ng-container>
    <ng-container *ngIf="!(value?.length >= 5)">
      <mat-card>
        <mat-card-content>
          <ng-container *ngIf="image">
            <img mat-card-image [style.backgroundImage]="image.source">
          </ng-container>
          <ng-container *ngIf="!image">
            <label mat-card-image
              for="image"
              (dragenter)="drag($event, 1)"
              (dragleave)="drag($event, -1)"
              (dragover)="drag($event)"
              (drop)="drop($event)">
              <i18n i18n="@@selectOrDropImage">selectOrDropImage</i18n>
            </label>
            <input accept="image/*" id="image" type="file" [formControl]="file">
          </ng-container>
          <mat-form-field>
            <mat-label><i18n i18n="@@caption">caption</i18n></mat-label>
            <textarea matInput matTextareaAutosize [formControl]="caption">
            </textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions>
          <button mat-button [disabled]="!image" (click)="clear()">
            <i18n i18n="@@reset">reset</i18n>
          </button>
          <button mat-button
            color="primary"
            [disabled]="!image"
            (click)="create()">
            <i18n i18n="@@create">create</i18n>
          </button>
        </mat-card-actions>
      </mat-card>
    </ng-container>
  `
})

export class ImageFieldComponent extends BaseFieldComponent
  implements AfterViewInit {

  public caption: FormControl = new FormControl();

  public file: FormControl = new FormControl();

  public image: ImageModel;

  public ngAfterViewInit(): void {
    this.file.valueChanges.pipe(
      map((value) => value.item(0)),
      filter((file) => file && file.type.startsWith('image/')),
      mergeMap((file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        return fromEvent(reader, 'load').pipe(map((event) =>
          Object.assign(new ImageModel(), {
            caption: this.caption.value || file.name,
            imageData: Base64.encode((event.target as any).result),
            mimeType: file.type
          })
        ));
      })
    ).subscribe((item) => {
      this.caption.patchValue(this.caption.value || item.caption);
      this.image = item;
    });
  }

  public clear(): void {
    this.caption.patchValue(null);
    this.image = null;
  }

  public create(): void {
    this.value = this.value.concat(Object.assign(this.image, {
      caption: this.caption.value || this.image.caption
    }));

    this.clear();
  }

  public delete(item: ImageModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  public drag(event: Event & any, inout?: number): void {
    event.preventDefault();

    if (inout !== undefined) {
      event.target.style.backgroundColor = inout > 0
        ? 'rgba(0, 0, 0, 0.04)'
        : null;
    }
  }

  public drop(event: Event & any): void {
    event.preventDefault();
    event.target.style.backgroundColor = null;

    this.file.patchValue(event.dataTransfer.files);
  }

  public edit(item: ImageModel): void {
    this.caption.patchValue(item.caption);
    this.delete(this.image = item);
  }

}
