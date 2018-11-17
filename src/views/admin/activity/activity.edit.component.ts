import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatListModule, MatStepperModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  styleUrls: ['../edit.component.scss'],
  template: ``
  // templateUrl: 'activity.stepper.component.html'
})

export class ActivityEditComponent {

  public static readonly imports = [
    FlexLayoutModule,
    FontAwesomeModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule
  ];

}
