import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TargetGroupModel } from '../../../base/models/target-group.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { TargetGroupFormComponent } from '../forms/target-group.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'target-group-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createTargetGroup">createTargetGroup</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editTargetGroup">editTargetGroup</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TargetGroupStepperComponent
  extends BaseStepper<TargetGroupModel> {

  public root: string = 'targetgroups';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: TargetGroupFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TargetGroupModel)
    .with('translations').yield('language');

  protected model: Type<TargetGroupModel> = TargetGroupModel;

}
