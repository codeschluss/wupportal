import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { TranslationFormComponent } from '../translation/translation.form';
import { TargetGroupFormComponent } from './target-group.form';
import { TargetGroupModel } from './target-group.model';

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

        <ng-container *ngSwitchCase="'target-group'">
          <i18n i18n="@@target-group">target-group</i18n>
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

  public root: string = 'target-group';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: TargetGroupFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TargetGroupModel);

  protected model: Type<TargetGroupModel> = TargetGroupModel;

}
