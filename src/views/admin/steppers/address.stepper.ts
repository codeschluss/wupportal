import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { AddressModel } from '../../../base/models/address.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { AddressFormComponent } from '../forms/address.form';

@Component({
  selector: 'address-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createAddress">createAddress</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editAddress">editAddress</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class AddressStepperComponent
  extends BaseStepper<AddressModel> {

  public root: string = 'addresses';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: AddressFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(AddressModel)
    .with('suburb');

  protected model: Type<AddressModel> = AddressModel;

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && `
      ${data.form.group.get('street').value || '...'}
      ${data.form.group.get('houseNumber').value || '...'},
      ${data.form.group.get('place').value || '...'}
    `;
  }

}
