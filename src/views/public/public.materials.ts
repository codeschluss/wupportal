import { Type } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

export const materials: Type<any>[] = [
  FlexLayoutModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatRippleModule
];
