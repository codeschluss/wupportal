import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { UserModel } from '../../../base/models/user.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { UserFormComponent } from '../forms/user.form';

@Component({
  selector: 'user-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createUser">createUser</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editUser">editUser</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class UserStepperComponent
  extends BaseStepper<UserModel> {

  public root: string = 'users';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: UserFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(UserModel);

  protected model: Type<UserModel> = UserModel;

}
