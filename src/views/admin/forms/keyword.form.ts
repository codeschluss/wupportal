import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { KeywordModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'keyword-form',
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

export class KeywordFormComponent
  extends BaseForm<KeywordModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: InputFieldComponent
    }
  ];

  public model: Type<KeywordModel> = KeywordModel;

}
