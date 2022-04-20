import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Base64, ImageModel } from '../../../core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    :host {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
    }
    img {
      background-position: center;
      background-size: cover;
      display: block;
      object-fit: cover;
    }
    input[type=file] { display: none; }
    mat-card {
      display: inline-block;
      margin: .5rem;
      width: 20rem;
    }
    mat-card .mat-card-image {
      align-items: center;
      background-color: #e0e0e0; /* $color-light */
      display: flex;
      flex-direction: column;
      height: 15rem;
      justify-content: center;
    }
    mat-card label.mat-card-image {
      cursor: pointer;
    }
    mat-card label.mat-card-image fa-icon {
      color: #a3a3a3; /* $color-dark */
      font-size: 4rem;
    }
    mat-form-field::ng-deep > .mat-form-field-wrapper {
      margin-bottom: -1.25rem;
    }
  `],
  template: `
    <mat-card>
      <mat-card-content>
        <ng-container *ngIf="value">
          <img mat-card-image
            src="data:image/svg+xml,
              %3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            [style.backgroundImage]="value.source">
        </ng-container>
        <ng-container *ngIf="!value">
          <label mat-card-image
            for="image"
            (dragenter)="drag($event, 1)"
            (dragleave)="drag($event, -1)"
            (dragover)="drag($event)"
            (drop)="drop($event)">
            <fa-icon icon="image"></fa-icon>
            <i18n>selectOrDropImage</i18n>
          </label>
          <input accept="image/*" id="image" type="file" [formControl]="file">
        </ng-container>
        <mat-form-field>
          <mat-label><i18n>caption</i18n></mat-label>
          <textarea matInput
            [formControl]="caption"
            [matTextareaAutosize]="true">
          </textarea>
          <button mat-button matSuffix [disabled]="!value" (click)="clear()">
            <i18n>reset</i18n>
          </button>
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `
})

export class ImageFieldComponent
  extends BaseFieldComponent
  implements AfterViewInit {

  public caption: FormControl = new FormControl();

  public file: FormControl = new FormControl();

  public ngAfterViewInit(): void {
    this.caption.valueChanges.pipe(
      filter(() => this.value)
    ).subscribe((caption) => {
      this.value = Object.assign(this.value, { caption });
    });

    this.file.valueChanges.pipe(
      map((value) => value.item(0)),
      filter((file) => file && file.type.startsWith('image/')),
      mergeMap((file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        return fromEvent(reader, 'load').pipe(map((event) => new ImageModel({
          caption: this.caption.value || file.name,
          imageData: Base64.encode((event.target as any).result),
          mimeType: file.type
        })));
      })
    ).subscribe((item) => {
      this.caption.patchValue(this.caption.value || item.caption);
      this.value = Object.assign(item, { caption: this.caption.value });
    });
  }

  public clear(): void {
    this.caption.patchValue(null);
    this.value = null;
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

}
