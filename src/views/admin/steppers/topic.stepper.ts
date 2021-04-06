import { Component, Type } from '@angular/core';
import { CrudJoiner, TopicModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { TopicFormComponent } from '../forms/topic.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'topic-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createTopic</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editTopic</i18n>
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

export class TopicStepperComponent
  extends BaseStepper<TopicModel> {

  public root: string = 'topics';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: TopicFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TopicModel)
    .with('translations').yield('language');

  protected model: Type<TopicModel> = TopicModel;

}
