import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { SuburbModel } from '../../../base/models/suburb.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { SuburbFormComponent } from '../forms/suburb.form';

@Component({
  selector: 'suburb-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createSuburb">createSuburb</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editSuburb">editSuburb</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbStepperComponent
  extends BaseStepper<SuburbModel> {

  public root: string = 'suburbs';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: SuburbFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SuburbModel);

  protected model: Type<SuburbModel> = SuburbModel;

}
