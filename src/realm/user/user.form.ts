import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { UserModel } from './user.model';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@fullname">fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'username'">
          <i18n i18n="@@username">username</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class UserFormComponent extends BaseForm<UserModel> {

  public fields: FormField[] = [
    {
      name: 'name',
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
    }
  ];

  public model: Type<UserModel> = UserModel;

}
