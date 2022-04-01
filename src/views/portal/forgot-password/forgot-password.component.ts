import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { RoutingComponent, UserProvider } from '../../../core';

@Component({
  styleUrls: ['forgot-password.component.sass'],
  templateUrl: 'forgot-password.component.html'
})

export class ForgotPasswordComponent
  extends RoutingComponent {


  public formGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
  });

  protected get routing(): Route {
    return {
      path: 'forgotpassword'
    };
  }

  public constructor(
    private userProvider: UserProvider
  ) {
    super();
  }

  public onResetPassword(): void {
    this.userProvider.resetPassword({
      value: this.formGroup.get('email').value
    }).subscribe();
  }



}
