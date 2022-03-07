import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { LabelModule } from '../../core';
import { PartsModule } from '../parts/module';
import { MapsComponent } from './maps.component';
import { MapsRouter } from './maps.router';

const components: Type<any>[] = [
  MapsComponent
];

const materials: Type<any>[] = [
  AngularOpenlayersModule,
  FontAwesomeModule,
  LabelModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ],
  imports: [
    ...materials,
    CommonModule,
    MapsRouter,
    PartsModule
  ]
})

export class MapsModule { }
