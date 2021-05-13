import { AfterViewInit, Component, OnDestroy, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserModel } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'user-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n>fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'password'">
          <i18n>password</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'passwordConfirm'">
          <i18n>passwordConfirm</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n>phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'username'">
          <i18n>email</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class UserFormComponent
  extends BaseForm<UserModel>
  implements AfterViewInit, OnDestroy {

  public fields: FormField[] = [
    {
      name: 'name',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'username',
      input: InputFieldComponent,
      tests: [
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
      ],
      type: 'email'
    },
    {
      name: 'phone',
      input: InputFieldComponent,
      type: 'tel'
    },
    {
      name: 'password',
      input: InputFieldComponent,
      tests: [
        Validators.minLength(8),
        Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
        Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
        Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/)
      ],
      type: 'password'
    },
    {
      name: 'passwordConfirm',
      input: InputFieldComponent,
      locked: true,
      tests: [
        Validators.minLength(8),
        Validators.pattern(/(?=(?:[^0-9]*[0-9]){1})/),
        Validators.pattern(/(?=(?:[^A-Z]*[A-Z]){1})/),
        Validators.pattern(/(?=(?:[^a-z]*[a-z]){1})/)
      ],
      type: 'password'
    }
  ];

  public model: Type<UserModel> = UserModel;

  private changes: Subscription = EMPTY.subscribe();

  public ngAfterViewInit(): void {
    this.changes = this.group.valueChanges.subscribe((v) => this.validate(v));
  }

  public ngOnDestroy(): void {
    this.changes.unsubscribe();
  }

  public persist(): Observable<any> {
    return super.persist().pipe(
      tap((item) => this.group.reset(item)),
      filter((item) => item.username !== this.item.username),
      tap(() => this.tokenProvider.remove())
    );
  }

  private validate(change: any): void {
    const ctrl1 = this.group.get('password');
    const ctrl2 = this.group.get('passwordConfirm');
    const { password: pw1, passwordConfirm: pw2 } = change;

    if (pw1 && ctrl2.disabled) {
      ctrl2.enable({ emitEvent: false });
    }

    if (!pw1 && ctrl2.enabled) {
      ctrl2.patchValue(null, { emitEvent: false });
      ctrl2.disable({ emitEvent: false });
    }

    if (pw1 && ctrl2.enabled && pw1 !== pw2) {
      ctrl1.setErrors({ mismatch: true });
      ctrl2.setErrors({ mismatch: true });
    } else {
      ctrl1.updateValueAndValidity({ emitEvent: false });
      ctrl2.updateValueAndValidity({ emitEvent: false });
    }
  }

}
