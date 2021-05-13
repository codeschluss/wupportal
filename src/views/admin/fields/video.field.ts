import { AfterViewInit, Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ImageModel, VideoModel } from '../../../core';
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
    mat-card {
      display: inline-block;
      margin: .5rem;
      width: 20rem;
    }
    mat-card .mat-card-image {
      align-items: center;
      background-color: #e0e0e0; /* $color-light */
      color: #a3a3a3; /* $color-dark */
      display: flex;
      flex-wrap: wrap;
      font-size: 4rem;
      height: 15rem;
      justify-content: center;
    }
  `],
  template: `
    <ng-container *ngFor="let item of value">
      <mat-card>
        <a target="_blank" [href]="item.url">
          <ng-container *ngIf="item.thumbnailUrl">
            <img mat-card-image
              [src]="item.thumbnailUrl">
          </ng-container>
          <ng-container *ngIf="!item.thumbnailUrl && item.thumbnail?.source">
            <img mat-card-image
              src="data:image/svg+xml,
                %3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
              [style.backgroundImage]="item.thumbnail.source">
          </ng-container>
          <ng-container *ngIf="!item.thumbnailUrl && !item.thumbnail?.source">
            <fa-icon mat-card-image icon="film"></fa-icon>
          </ng-container>
        </a>
        <mat-card-content>{{ item.label }}</mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions>
          <button mat-button color="warn" (click)="delete(item)">
            <i18n>delete</i18n>
          </button>
          <button mat-button [disabled]="imageUrl.value" (click)="edit(item)">
            <i18n>edit</i18n>
          </button>
        </mat-card-actions>
      </mat-card>
    </ng-container>
    <ng-container *ngIf="!(value?.length >= 5)">
      <mat-card>
        <ng-container *ngIf="imageUrl.value">
          <img mat-card-image
            [src]="imageUrl.value">
        </ng-container>
        <ng-container *ngIf="!imageUrl.value">
          <fa-icon mat-card-image icon="film"></fa-icon>
        </ng-container>
        <mat-card-content>
          <mat-form-field>
            <mat-label>
              <i18n>videoUrl</i18n>
            </mat-label>
            <input matInput [formControl]="videoUrl">
          </mat-form-field>
          <mat-form-field>
            <mat-label>
              <i18n>caption</i18n>
            </mat-label>
            <textarea matInput
              [formControl]="caption"
              [matTextareaAutosize]="true">
            </textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions>
          <button mat-button
            [disabled]="!imageUrl.value"
            (click)="clear()">
            <i18n>reset</i18n>
          </button>
          <button mat-button
            color="primary"
            [disabled]="!videoUrl.valid"
            (click)="create()">
            <i18n>create</i18n>
          </button>
        </mat-card-actions>
      </mat-card>
    </ng-container>
  `
})

export class VideoFieldComponent
  extends BaseFieldComponent
  implements AfterViewInit {

  private static regex: Record<string, RegExp> = {
    vimeo: /^https?:\/\/vimeo.com\/(\d+)$/,
    youtube: /^https?:\/\/(?:m.|www\.)youtube\.com\/watch\?v=([^/#&?]+)$/
  };

  public caption: FormControl = new FormControl(null);

  public imageUrl: FormControl = new FormControl(null);

  public videoUrl: FormControl = new FormControl(null, [
    Validators.pattern(
      Object.values(VideoFieldComponent.regex).map((r) => r.source).join('|')
    ),
    Validators.required
  ]);

  public constructor(
    container: ViewContainerRef,
    factories: ComponentFactoryResolver
  ) {
    super(container, factories);
  }

  public ngAfterViewInit(): void {
    this.videoUrl.valueChanges.pipe(
      filter(() => this.videoUrl.valid),
      mergeMap((url) => this.source(url))
    ).subscribe((src) => this.imageUrl.patchValue(src));
  }

  public clear(): void {
    this.caption.reset();
    this.imageUrl.reset();
    this.videoUrl.reset();
  }

  public create(): void {
    this.value = this.value.concat(Object.assign(new VideoModel(), {
      thumbnail: Object.assign(new ImageModel(), {
        caption: this.caption.value || this.videoUrl.value
      }),
      thumbnailCaption: this.caption.value || this.videoUrl.value,
      thumbnailUrl: this.imageUrl.value,
      url: this.videoUrl.value
    }));

    this.clear();
  }

  public delete(item: VideoModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  public edit(item: VideoModel): void {
    this.source(item.url).subscribe((imageUrl) => {
      this.caption.patchValue(item.label);
      this.imageUrl.patchValue(imageUrl);
      this.videoUrl.patchValue(item.url);
      this.delete(item);
    });
  }

  private source(url: string): Observable<string> {
    let match; switch (true) {
      case VideoFieldComponent.regex.vimeo.test(url):
        match = url.match(VideoFieldComponent.regex.vimeo);
        return from(fetch(`http://vimeo.com/api/v2/video/${match.pop()}.json`, {
          cache: 'no-cache',
          method: 'GET',
          mode: 'cors'
        })).pipe(
          mergeMap((response) => from(response.json())),
          map((json) => json.pop().thumbnail_large)
        );

      case VideoFieldComponent.regex.youtube.test(url):
        match = url.match(VideoFieldComponent.regex.youtube);
        return of(`http://img.youtube.com/vi/${match.pop()}/0.jpg`);

      default:
        return of('');
    }
  }

}
