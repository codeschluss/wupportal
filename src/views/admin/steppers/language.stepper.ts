import { Component, Type } from '@angular/core';
import { CrudJoiner, LanguageModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { LanguageFormComponent } from '../forms/language.form';

@Component({
  selector: 'language-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createLanguage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editLanguage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class LanguageStepperComponent
  extends BaseStepper<LanguageModel> {

  public root: string = 'languages';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: LanguageFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(LanguageModel);

  protected model: Type<LanguageModel> = LanguageModel;

}
