import { Component } from '@angular/core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    mat-option fa-icon {
      display: inline-block;
      text-align: center;
      width: 2rem;
    }
  `],
  template: BaseFieldComponent.template(`
    <mat-select [formControlName]="field.name" [id]="field.name">
      <ng-container *ngFor="let icon of icons">
        <mat-option [value]="icon.iconName">
          <fa-icon [icon]="icon"></fa-icon>
          {{ icon.iconName }}
        </mat-option>
      </ng-container>
    </mat-select>
    <a mat-button matSuffix
      href="https://fontawesome.com/icons?m=free&s=solid"
      target="_blank">
      <i18n>iconList</i18n>
    </a>
  `)
})

export class IconFieldComponent
  extends BaseFieldComponent {

  public get icons(): IconDefinition[] {
    return Object.values(fas);
  }

}
