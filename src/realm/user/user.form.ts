import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, StringFieldComponent } from '@portal/forms';
import { UserModel } from './user.model';
import { UserProvider } from './user.provider';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <i18n *ngSwitchCase="'fullname'" i18n="@@fullname">fullname</i18n>
    <i18n *ngSwitchCase="'username'" i18n="@@email">email</i18n>
    <i18n *ngSwitchCase="'phone'" i18n="@@phone">phone</i18n>
    <i18n *ngSwitchCase="'password'" i18n="@@password">password</i18n>
    <i18n *ngSwitchCase="'passwordConfirm'"
      i18n="@@passwordConfifm">passwordConfirm</i18n>
  `)
})

export class UserFormComponent extends BaseForm<UserModel> {

  public fields = [
    {
      name: 'fullname',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'username',
      input: StringFieldComponent,
      tests: [Validators.required, Validators.email],
      type: 'email'
    },
    {
      name: 'phone',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'tel'
    },
    {
      name: 'password',
      input: StringFieldComponent,
      tests: [Validators.minLength(12)],
      type: 'password'
    },
    {
      name: 'passwordConfirm',
      input: StringFieldComponent,
      tests: [Validators.minLength(12)],
      type: 'password'
    }
  ];

  public model = UserModel;

  public constructor(
    protected builder: FormBuilder,
    protected provider: UserProvider,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
