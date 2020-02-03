import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TopicModel } from '../../../base/models/topic.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { TopicFormComponent } from '../forms/topic.form';
import { TranslationFormComponent } from '../forms/translation.form';

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
