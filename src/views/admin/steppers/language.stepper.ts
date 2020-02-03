import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { LanguageModel } from '../../../base/models/language.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { LanguageFormComponent } from '../forms/language.form';

@Component({
  selector: 'language-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createLanguage">createLanguage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editLanguage">editLanguage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
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
