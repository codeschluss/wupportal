import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatListModule, MatStepperModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export abstract class StepperComponent {

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
