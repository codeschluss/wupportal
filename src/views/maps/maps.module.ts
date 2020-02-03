import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { AppCommonModule } from '@wooportal/app';
import { PublicModule } from '../public/public.module';
import { SharedModule } from '../shared/shared.module';
import { MapsComponent } from './maps.component';
import { materials } from './maps.imports';
import { MapsRouter } from './maps.router';

const components: Type<any>[] = [
  MapsComponent
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
    AppCommonModule,
    MapsRouter,
    PublicModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class MapsModule { }
