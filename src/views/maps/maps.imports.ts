import { Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularOpenlayersModule } from 'ngx-openlayers';

export const materials: Type<any>[] = [
  AngularOpenlayersModule,
  FontAwesomeModule,
  MatButtonModule,
  MatRippleModule
];
