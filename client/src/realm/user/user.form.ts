import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { UserModel } from './user.model';
import { UserProvider } from './user.provider';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <i18n #fullname i18n="@@fullname">fullname</i18n>
    <i18n #username i18n="@@email">email</i18n>
    <i18n #phone i18n="@@phone">phone</i18n>
    <i18n #password i18n="@@password">password</i18n>
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
      input: SelectFieldComponent,
      tests: [Validators.required],
      type: 'tel'
    },
    {
      name: 'password',
      input: StringFieldComponent,
      tests: [Validators.required, Validators.minLength(12)],
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

  protected ngPostInit(): void {
    const username = this.route.snapshot.data.session.refreshToken.sub;
    this.provider.readAll({ filter: username }).then((models) => {
      const user = models.find((model) => model.username === username);
      Object.keys(this.group.controls).forEach((field) =>
        this.group.controls[field].setValue(user[field]));
    });
  }

}
