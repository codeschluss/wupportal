import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { LanguageFormComponent } from './language.form';
import { LanguageModel } from './language.model';

@Component({
  selector: 'language-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'language'" i18n="@@language">language</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class LanguageStepperComponent extends BaseStepper<LanguageModel> {

  public root: string = 'language';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: LanguageFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(LanguageModel);

  protected model: Type<LanguageModel> = LanguageModel;

}
