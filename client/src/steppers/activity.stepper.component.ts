import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatListModule, MatStepperModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StepperComponent } from 'src/steppers/stepper.component';

@Component({
  // templateUrl: 'activity.stepper.component.html',
  template: ``,
  styleUrls: ['stepper.component.scss'],
})

export class ActivityStepperComponent extends StepperComponent {

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
