import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { SubscriptionTypeModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'subscription-type-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n>description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SubscriptionTypeFormComponent
  extends BaseForm<SubscriptionTypeModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: EditorFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<SubscriptionTypeModel> = SubscriptionTypeModel;

}
