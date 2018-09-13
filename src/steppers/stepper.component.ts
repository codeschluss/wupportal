import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatListModule, MatStepperModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import * as fas from '@fortawesome/free-solid-svg-icons';

fontawesome.add(
  fas.faAt,
  fas.faCheck,
  fas.faIdCard,
  fas.faKey,
  fas.faPhone
);

const imports = [
  FlexLayoutModule,
  FontAwesomeModule,
  FormsModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatStepperModule
];

export abstract class StepperComponent {

}

Object.assign(StepperComponent, { imports: imports });
