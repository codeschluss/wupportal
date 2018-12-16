import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { ScheduleModel } from './schedule.model';

@Component({
  selector: 'schedule-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'schedule'" i18n="@@schedule">schedule</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class ScheduleFormComponent extends BaseForm<ScheduleModel> {

  public fields: FormField[] = [
    {
      name: 'schedule',
      input: StringFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<ScheduleModel> = ScheduleModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
