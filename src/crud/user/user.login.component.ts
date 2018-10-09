import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  templateUrl: 'user.login.component.html'
})

export class UserAuthComponent {

  public static readonly imports = [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ];

  public username: string;

  public password: string;

  public onSubmit(): boolean {
    alert('login: ' + this.username + ':' + this.password);
    return false;
  }

}
