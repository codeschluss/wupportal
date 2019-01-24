import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { TranslationFormComponent } from '../translation/translation.form';
import { TopicFormComponent } from './topic.form';
import { TopicModel } from './topic.model';

@Component({
  selector: 'topic-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createTopic">createTopic</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editTopic">editTopic</i18n>
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
