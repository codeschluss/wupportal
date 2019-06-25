import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { PlatformCommonModule } from '@wooportal/core';
import { BaseModule } from '../../base/base.module';
import { SharedModule } from '../shared/shared.module';
import { OrganisationItemComponent } from './organisation/item/organisation.item';
import { OrganisationMultiComponent } from './organisation/muliti/organisation.multi';
import { PublicComponent } from './public.component';
import { materials } from './public.materials';
import { PublicRouter } from './public.router';

const components: Type<any>[] = [
  OrganisationItemComponent,
  OrganisationMultiComponent,
  PublicComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  entryComponents: [
    OrganisationMultiComponent
  ],
  imports: [
    ...materials,
    BaseModule,
    PublicRouter,
    PlatformCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class PublicModule { }
