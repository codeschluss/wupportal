import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { SuburbModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'suburb-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbFormComponent
  extends BaseForm<SuburbModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<SuburbModel> = SuburbModel;

}
