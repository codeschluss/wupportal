import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'houseNumber'"
          i18n="@@houseNumber">houseNumber</i18n>
        <i18n *ngSwitchCase="'place'" i18n="@@place">place</i18n>
        <i18n *ngSwitchCase="'postalCode'" i18n="@@postalCode">postalCode</i18n>
        <i18n *ngSwitchCase="'suburb'" i18n="@@suburb">suburb</i18n>
        <i18n *ngSwitchCase="'street'" i18n="@@street">street</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class AddressFormComponent extends BaseForm<AddressModel> {

  public fields: FormField[] = [
    {
      name: 'place',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'postalCode',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'suburb',
      input: SelectFieldComponent,
      model: SuburbModel,
      tests: [Validators.required]
    },
    {
      name: 'street',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'houseNumber',
      input: StringFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<AddressModel> = AddressModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
