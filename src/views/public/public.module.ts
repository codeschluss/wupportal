import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { SharedModule } from '../shared/shared.module';
import { ActivityCardComponent } from './cards/activity/activity.card';
import { BlogpostCardComponent } from './cards/blogpost/blogpost.card';
import { InfopageCardComponent } from './cards/infopage/infopage.card';
import { OrganisationCardComponent } from './cards/organisation/organisation.card';
import { ActivityListingComponent } from './listings/activities/activity.listing';
import { BlogpostListingComponent } from './listings/blogposts/blogpost.listing';
import { InfopageListingComponent } from './listings/infopages/infopage.listing';
import { OrganisationListingComponent } from './listings/organisations/organisation.listing';
import { ActivityObjectComponent } from './objects/activity/activity.object';
import { BlogpostObjectComponent } from './objects/blogpost/blogpost.object';
import { InfopageObjectComponent } from './objects/infopage/infopage.object';
import { OrganisationObjectComponent } from './objects/organisation/organisation.object';
import { HomePageComponent } from './pages/home/home.page';
import { ImprintPageComponent } from './pages/imprint/imprint.page';
import { LoginPageComponent } from './pages/login/login.page';
import { LogoutPageComponent } from './pages/logout/logout.page';
import { PoliciesPageComponent } from './pages/policies/policies.page';
import { RegisterPageComponent } from './pages/register/register.page';
import { SearchPageComponent } from './pages/search/search.page';
import { DetailsPieceComponent } from './pieces/details/details.piece';
import { LikePieceComponent } from './pieces/like/like.piece';
import { SharePieceComponent } from './pieces/share/share.piece';
import { TimePieceComponent } from './pieces/time/time.piece';
import { PublicComponent } from './public.component';
import { materials } from './public.imports';
import { PublicRouter } from './public.router';

const cards: Type<any>[] = [
  ActivityCardComponent,
  BlogpostCardComponent,
  InfopageCardComponent,
  OrganisationCardComponent
];

const listings: Type<any>[] = [
  ActivityListingComponent,
  BlogpostListingComponent,
  InfopageListingComponent,
  OrganisationListingComponent,
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
  LoginPageComponent,
  LogoutPageComponent,
  PoliciesPageComponent,
  RegisterPageComponent,
  SearchPageComponent
];

const pieces: Type<any>[] = [
  DetailsPieceComponent,
  LikePieceComponent,
  SharePieceComponent,
  TimePieceComponent
];

@NgModule({
  declarations: [
    ...cards,
    ...listings,
    ...objects,
    ...pages,
    ...pieces,
    PublicComponent
  ],
  entryComponents: [
    ...listings,
    ...objects,
    ...pages
  ],
  exports: [
    ...cards
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
