import { Component } from '@angular/core';
import * as moment from 'moment';
import { ScheduleModel } from '../../../base/models/schedule.model';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    input[readonly] { flex: none; margin: .25rem 0; width: 0; }
  `],
  template: BaseFieldComponent.template(`
    <mat-chip-list #chipList class="mat-body-strong">
      <input readonly [id]="field.name" [matChipInputFor]="chipList">
      <ng-container ngProjectAs="mat-chip" *ngFor="let item of sorted">
        <mat-chip [selectable]="false" (removed)="delete(item)">
          <time>{{ item.datetime }}</time>
          <span matChipRemove>&#x274c;</span>
        </mat-chip>
      </ng-container>
    </mat-chip-list>
  `)
})

export class ScheduleFieldComponent extends BaseFieldComponent {

  public get sorted(): ScheduleModel[] {
    return this.value.sort((a, b) => moment(a.startDate).diff(b.startDate));
  }

  public delete(item: ScheduleModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  protected ngPostInit(): void {
    if (!this.value) { this.control.patchValue([], { emitEvent: false }); }
  }

}
