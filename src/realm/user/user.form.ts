import { AfterViewInit, Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenProvider } from '@portal/core';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserModel } from './user.model';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@fullname">fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'password'">
          <i18n i18n="@@password">password</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'passwordConfirm'">
          <i18n i18n="@@passwordConfirm">passwordConfirm</i18n>
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

export class UserFormComponent extends BaseForm<UserModel>
  implements AfterViewInit {

  public fields: FormField[] = [
    {
      name: 'name',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'username',
      input: StringFieldComponent,
      tests: [
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
      ],
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
      tests: [
        Validators.minLength(10),
        Validators.pattern(/(?=(?:[^0-9]*[0-9]){2})/),
        Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){2})/),
        Validators.pattern(/(?=(?:[^a-z]*[a-z]){2})/)
      ],
      type: 'password'
    },
    {
      name: 'passwordConfirm',
      input: StringFieldComponent,
      locked: true,
      tests: [
        Validators.minLength(10),
        Validators.pattern(/(?=(?:[^0-9]*[0-9]){2})/),
        Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){2})/),
        Validators.pattern(/(?=(?:[^a-z]*[a-z]){2})/)
      ],
      type: 'password'
    }
  ];

  public model: Type<UserModel> = UserModel;

  public constructor(
    private tokenProvider: TokenProvider,
    route: ActivatedRoute,
  ) {
    super(route);
  }

  public ngAfterViewInit(): void {
    this.group.valueChanges.subscribe((change) => this.validate(change));
  }

  public persist(): Observable<any> {
    return super.persist().pipe(
      filter((item) => item.username !== this.item.username),
      tap(() => this.tokenProvider.remove()));
  }

  private validate(change: any): void {
    const ctrl1 = this.group.get('password');
    const ctrl2 = this.group.get('passwordConfirm');
    const { password: pw1, passwordConfirm: pw2 } = change;

    if (pw1 && ctrl2.disabled) {
      ctrl2.enable();
    }

    if (!pw1 && ctrl2.enabled) {
      ctrl2.patchValue(null, { emitEvent: false });
      ctrl2.disable();
    }

    if (pw1 && ctrl2.enabled && pw1 !== pw2) {
      ctrl1.setErrors({ missmatch: true });
      ctrl2.setErrors({ missmatch: true });
    } else {
      ctrl1.updateValueAndValidity({ emitEvent: false });
      ctrl2.updateValueAndValidity({ emitEvent: false });
    }
  }

}
