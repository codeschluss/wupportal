import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@wooportal/forms';
import { CategoryModel } from '../../../realm/models/category.model';
import { TranslationBase } from '../../../realm/translations/translation.base';
import { IconFieldComponent } from '../fields/icon.field';

@Component({
  selector: 'category-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'color'">
          <i18n i18n="@@color">color</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'icon'">
          <i18n i18n="@@icon">icon</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryFormComponent
  extends TranslationBase<CategoryModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent
    },
    {
      name: 'icon',
      input: IconFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'color',
      input: StringFieldComponent,
      tests: [
        Validators.pattern(/^#[0-9A-Fa-f]{6}$/),
        Validators.required
      ],
      type: 'color'
    }
  ];

  public model: Type<CategoryModel> = CategoryModel;

}
