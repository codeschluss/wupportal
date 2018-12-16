import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { AddressFormComponent } from '../address/address.form';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'address'" i18n="@@address">address</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class AddressStepperComponent extends BaseStepper<AddressModel> {

  public root: string = 'address';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: AddressFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(AddressModel).with('suburb');

  protected model: Type<AddressModel> = AddressModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
