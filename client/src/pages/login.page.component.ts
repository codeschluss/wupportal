import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const imports = [
  FormsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];

@Component({
  templateUrl: 'login.page.component.html',
  styleUrls: ['page.component.scss']
})

export class LoginPageComponent {

  public username: string;

  public password: string;

  public onSubmit(): boolean {
    console.log('login: ' + this.username + ':' + this.password);
    return false;
  }

}

Object.assign(LoginPageComponent, { imports: imports });
