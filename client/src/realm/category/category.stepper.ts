import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { TranslationFormComponent } from '../translation/translation.form';
import { CategoryFormComponent } from './category.form';
import { CategoryModel } from './category.model';

@Component({
  selector: 'category-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createCategory">createCategory</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editCategory">editCategory</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
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
