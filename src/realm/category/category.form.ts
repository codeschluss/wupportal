import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { CategoryModel } from './category.model';

@Component({
  selector: 'address-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'description'"
          i18n="@@description">description</i18n>
        <i18n *ngSwitchCase="'color'" i18n="@@color">color</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@name">name</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryFormComponent extends BaseForm<CategoryModel> {

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
      name: 'color',
      input: StringFieldComponent,
      tests: [Validators.required, Validators.pattern(/^#[0-9A-Fa-f]{6}$/)],
      type: 'color'
    }
  ];

  public model: Type<CategoryModel> = CategoryModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
