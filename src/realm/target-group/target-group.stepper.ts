import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
        <i18n *ngSwitchCase="'target-group'"
          i18n="@@target-group">target-group</i18n>
        <i18n *ngSwitchCase="'translations'"
          i18n="@@translations">translations</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class TargetGroupStepperComponent extends BaseStepper<TargetGroupModel> {

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

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
