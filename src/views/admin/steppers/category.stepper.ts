import { Component, Type } from '@angular/core';
import { CategoryModel, CrudJoiner } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { CategoryFormComponent } from '../forms/category.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'category-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createCategory</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editCategory</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n>translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryStepperComponent
  extends BaseStepper<CategoryModel> {

  public root: string = 'categories';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: CategoryFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(CategoryModel)
    .with('translations').yield('language');

  protected model: Type<CategoryModel> = CategoryModel;

}
