import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, ResolveData } from '@angular/router';
import { CrudJoiner, CrudResolver } from '@portal/core';
import { BaseForm, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';
import { AddressProvider } from './address.provider';

@Component({
  selector: 'activity-form',
  template: BaseForm.template(`
    <i18n #place i18n="@@place">place</i18n>
    <i18n #postalCode i18n="@@postalCode">postalCode</i18n>
    <i18n #suburb i18n="@@suburb">suburb</i18n>
    <i18n #street i18n="@@street">street</i18n>
    <i18n #houseNumber i18n="@@houseNumber">houseNumber</i18n>
  `)
})

export class AddressFormComponent
  extends BaseForm<AddressProvider, AddressModel> {

  public static resolve: ResolveData = {
    address: CrudResolver,
    suburb: CrudResolver
  };

  public static resolveConf: Data = {
    address: CrudJoiner.of(AddressModel).with(SuburbModel),
    suburb: CrudJoiner.of(SuburbModel, false)
  };

  public base = 'address';

  public fields = [
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

  protected model = this.formed(AddressModel);

  public constructor(
    protected builder: FormBuilder,
    protected provider: AddressProvider,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
