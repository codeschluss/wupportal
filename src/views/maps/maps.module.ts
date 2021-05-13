import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { LabelModule } from '../../core';
import { PublicModule } from '../public/public.module';
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
    PublicModule
  ]
})

export class MapsModule { }
