import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { SharedModule } from '../shared/shared.module';
import { ActivityListComponent } from './lists/activities/activity.list';
import { BlogpostListComponent } from './lists/blogposts/blogpost.list';
import { InfopageListComponent } from './lists/infopages/infopage.list';
import { OrganisationListComponent } from './lists/organisations/organisation.list';
import { ActivityObjectComponent } from './objects/activity/activity.object';
import { BlogpostObjectComponent } from './objects/blogpost/blogpost.object';
import { InfopageObjectComponent } from './objects/infopage/infopage.object';
import { OrganisationObjectComponent } from './objects/organisation/organisation.object';
import { HomePageComponent } from './pages/home/home.page';
import { ImprintPageComponent } from './pages/imprint/imprint.page';
import { PoliciesPageComponent } from './pages/policies/policies.page';
import { PublicComponent } from './public.component';
import { materials } from './public.materials';
import { PublicRouter } from './public.router';
import { SearchDummyComponent } from './search/search.dummy';

const lists: Type<any>[] = [
  ActivityListComponent,
  BlogpostListComponent,
  InfopageListComponent,
  OrganisationListComponent,
];

const objects: Type<any>[] = [
  ActivityObjectComponent,
  BlogpostObjectComponent,
  InfopageObjectComponent,
  OrganisationObjectComponent,
];

const pages: Type<any>[] = [
  HomePageComponent,
  ImprintPageComponent,
  PoliciesPageComponent
];

@NgModule({
  declarations: [
    ...lists,
    ...objects,
    ...pages,
    PublicComponent,

    // TODO: remove
    SearchDummyComponent
  ],
  entryComponents: [
    ...lists,
    ...objects,
    ...pages,

    // TODO: remove
    SearchDummyComponent
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
