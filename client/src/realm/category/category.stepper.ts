import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
        <i18n *ngSwitchCase="'category'" i18n="@@category">category</i18n>
        <i18n *ngSwitchCase="'translations'"
          i18n="@@translations">translations</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryStepperComponent extends BaseStepper<CategoryModel> {

  public root: string = 'category';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: CategoryFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(CategoryModel);

  protected model: Type<CategoryModel> = CategoryModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
