import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { TopicModel } from '../../../base/models/topic.model';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';

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
  extends BaseForm<TopicModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<TopicModel> = TopicModel;

}
