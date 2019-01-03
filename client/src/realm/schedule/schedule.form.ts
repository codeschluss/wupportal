import { Component, Type } from '@angular/core';
import { CrudModel } from '@portal/core';
import { BaseForm, FormField } from '@portal/forms';
import { Observable, of } from 'rxjs';
import { ScheduleFieldComponent } from './schedule.field';
import { ScheduleModel } from './schedule.model';

@Component({
  selector: 'schedule-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'schedules'">
          <i18n i18n="@@schedules">schedules</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ScheduleFormComponent extends BaseForm<ScheduleModel> {

  public fields: FormField[] = [
    {
      name: 'schedules',
      input: ScheduleFieldComponent,
      model: ScheduleModel
    }
  ];

  public model: Type<ScheduleModel> = ScheduleModel;

  public ngPostInit(): void {
    this.fields[0].value = this.item;
  }

  protected persist(items?: { [key: string]: CrudModel }): Observable<any> {
    return of(this.value('schedules', items));
  }

}
