import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { LanguageModel } from '../../../base/models/language.model';
import { BaseForm, FormField } from '../base/base.form';
import { StringFieldComponent } from '../fields/string.field';

@Component({
  selector: 'language-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'locale'">
          <i18n i18n="@@locale">locale</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'machineTranslated'">
          <i18n i18n="@@machineTranslated">machineTranslated</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class LanguageFormComponent
  extends BaseForm<LanguageModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'locale',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'machineTranslated',
      input: StringFieldComponent
    }
  ];

  public model: Type<LanguageModel> = LanguageModel;

}
