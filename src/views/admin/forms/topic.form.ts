import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@wooportal/forms';
import { TopicModel } from '../../../realm/models/topic.model';
import { TranslationBase } from '../../../realm/translations/translation.base';

@Component({
  selector: 'topic-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TopicFormComponent
  extends TranslationBase<TopicModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<TopicModel> = TopicModel;

}
