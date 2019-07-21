import { Type } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularOpenlayersModule } from 'ngx-openlayers';

export const materials: Type<any>[] = [
  AngularOpenlayersModule,
  FlexLayoutModule,
  FontAwesomeModule,
  MatButtonModule,
  MatRippleModule
];
