import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { KeywordModel } from '../../../base/models/keyword.model';
import { BaseForm, FormField } from '../base/base.form';
import { StringFieldComponent } from '../fields/string.field';

@Component({
  selector: 'keyword-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
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
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent
    }
  ];

  public model: Type<KeywordModel> = KeywordModel;

}
