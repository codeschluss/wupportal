import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatDividerModule, MatFormFieldModule, MatListModule, MatStepperModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  styleUrls: ['../edit.component.scss'],
  templateUrl: 'user.edit.component.html'
})

export class UserEditComponent {

  public static readonly imports = [
    FlexLayoutModule,
    FontAwesomeModule,
    FormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatListModule,
    MatStepperModule
  ];

}
