import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@wooportal/forms';
import { TargetGroupModel } from '../../../realm/models/target-group.model';
import { TranslationBase } from '../../../realm/translations/translation.base';

@Component({
  selector: 'target-group-form',
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

export class TargetGroupFormComponent
  extends TranslationBase<TargetGroupModel> {

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

  public model: Type<TargetGroupModel> = TargetGroupModel;

}
