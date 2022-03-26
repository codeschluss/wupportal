import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { StringPrimitive } from 'src/api/models/string-primitive';
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

  public get valid(): boolean {
    return true
      && this.formGroup.valid
  }

  protected get routing(): Route {
    return {
      path: 'forgotpassword'
    };
  }

  public constructor(
    private router: Router,
    private userProvider: UserProvider
  ) {
    super();
  }

  public onResetPassword(): void {
    let userName: StringPrimitive = this.formGroup.get('email').value;
    console.log(userName);
    if(userName === null || ''){
      console.log('invalid or empty username');
      return;
    }

    this.userProvider.resetPassword(userName).subscribe();
  }



}
