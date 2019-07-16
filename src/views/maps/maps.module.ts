import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '@wooportal/core';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { MapsComponent } from './maps.component';
import { MapsRouter } from './maps.router';

const components: Type<any>[] = [
  MapsComponent
];

const materials: Type<any>[] = [
  AngularOpenlayersModule,
  FontAwesomeModule,
  MatButtonModule,
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
    CoreModule,
    MapsRouter
  ]
})

export class MapsModule { }
