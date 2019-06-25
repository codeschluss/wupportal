import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { SharedModule } from '../shared/shared.module';
import { OrganisationItemComponent } from './organisation/item/organisation.item';
import { OrganisationListComponent } from './organisation/list/organisation.list';
import { PublicComponent } from './public.component';
import { materials } from './public.materials';
import { PublicRouter } from './public.router';

const components: Type<any>[] = [
  OrganisationItemComponent,
  OrganisationListComponent,
  PublicComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  entryComponents: [
    OrganisationListComponent
  ],
  imports: [
    ...materials,
    CoreModule,
    PublicRouter,
    PlatformCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class PublicModule { }
