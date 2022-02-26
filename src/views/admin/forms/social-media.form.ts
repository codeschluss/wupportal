import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { SocialMediaModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { BrandFieldComponent } from '../fields/brand.field';
import { InputFieldComponent } from '../fields/input.field';
import { UrlFieldComponent } from '../fields/url.field';

@Component({
  selector: 'social-media-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'icon'">
          <i18n>icon</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'url'">
          <i18n>url</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SocialMediaFormComponent
  extends BaseForm<SocialMediaModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'icon',
      input: BrandFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'url',
      input: UrlFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<SocialMediaModel> = SocialMediaModel;

}
