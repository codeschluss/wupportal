import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { PublicModule } from '../public/public.module';
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
    CoreModule,
    MapsRouter,
    PlatformCommonModule,
    PublicModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class MapsModule { }
