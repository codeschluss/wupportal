import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { TargetGroupModel } from './target-group.model';

@Component({
  selector: 'target-group-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TargetGroupFormComponent extends BaseForm<TargetGroupModel> {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'description',
      input: StringFieldComponent,
      multi: true,
      tests: [Validators.required]
    }
  ];

  public model: Type<TargetGroupModel> = TargetGroupModel;

}
