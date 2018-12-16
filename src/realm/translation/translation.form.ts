import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { TranslationModel } from './translation.model';

@Component({
  selector: 'translation-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'lang'" i18n="@@lang">lang</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class TranslationFormComponent extends BaseForm<TranslationModel> {

  public fields: FormField[] = [
    {
      name: 'lang',
      input: StringFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<TranslationModel> = TranslationModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
