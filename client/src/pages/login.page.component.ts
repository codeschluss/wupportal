import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  templateUrl: 'login.page.component.html',
  styleUrls: ['page.component.scss']
})

export class LoginPageComponent {

  public static readonly imports = [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ];

  public username: string;

  public password: string;

  public onSubmit(): boolean {
    console.log('login: ' + this.username + ':' + this.password);
    return false;
  }

}
