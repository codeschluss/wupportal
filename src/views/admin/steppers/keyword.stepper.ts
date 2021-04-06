import { Component, Type } from '@angular/core';
import { CrudJoiner, KeywordModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { KeywordFormComponent } from '../forms/keyword.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'keyword-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createKeyword</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editKeyword</i18n>
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

export class KeywordsStepperComponent
  extends BaseStepper<KeywordModel> {

  public root: string = 'tags';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: KeywordFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(KeywordModel)
    .with('translations').yield('language');

  protected model: Type<KeywordModel> = KeywordModel;

  protected get path(): string {
    return 'keywords';
  }

}
