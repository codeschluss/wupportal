import { Component, Type } from '@angular/core';
import { BaseForm, FormField } from '@portal/forms';
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

  public fields: FormField[] = [];

  public model: Type<ScheduleModel> = ScheduleModel;

}
