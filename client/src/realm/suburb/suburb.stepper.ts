import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { SuburbFormComponent } from './suburb.form';
import { SuburbModel } from './suburb.model';

@Component({
  selector: 'suburb-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'suburb'" i18n="@@suburb">suburb</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbStepperComponent extends BaseStepper<SuburbModel> {

  public root: string = 'suburb';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: SuburbFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SuburbModel);

  protected model: Type<SuburbModel> = SuburbModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
