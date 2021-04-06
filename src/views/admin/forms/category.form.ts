import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { CategoryModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { IconFieldComponent } from '../fields/icon.field';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'category-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'color'">
          <i18n>color</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n>description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'icon'">
          <i18n>icon</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryFormComponent
  extends BaseForm<CategoryModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: InputFieldComponent
    },
    {
      name: 'icon',
      input: IconFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'color',
      input: InputFieldComponent,
      tests: [
        Validators.pattern(/^#[0-9A-Fa-f]{6}$/),
        Validators.required
      ],
      type: 'color'
    }
  ];

  public model: Type<CategoryModel> = CategoryModel;

}
