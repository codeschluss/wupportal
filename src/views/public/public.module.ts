import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { AppCommonModule } from '@wooportal/app';
import { CrudModel } from '@wooportal/core';
import { SharedModule } from '../shared/shared.module';
import { ActivityCardComponent } from './cards/activity/activity.card';
import { BaseCard } from './cards/base.card';
import { BlogpostCardComponent } from './cards/blogpost/blogpost.card';
import { InfopageCardComponent } from './cards/infopage/infopage.card';
import { OrganisationCardComponent } from './cards/organisation/organisation.card';
import { ActivityListingComponent } from './listings/activities/activity.listing';
import { BaseListing } from './listings/base.listing';
import { BlogpostListingComponent } from './listings/blogposts/blogpost.listing';
import { InfopageListingComponent } from './listings/infopages/infopage.listing';
import { OrganisationListingComponent } from './listings/organisations/organisation.listing';
import { ActivityObjectComponent } from './objects/activity/activity.object';
import { BaseObject } from './objects/base.object';
import { BlogpostObjectComponent } from './objects/blogpost/blogpost.object';
import { InfopageObjectComponent } from './objects/infopage/infopage.object';
import { OrganisationObjectComponent } from './objects/organisation/organisation.object';
import { BasePage } from './pages/base.page';
import { HomePageComponent } from './pages/home/home.page';
import { ImprintPageComponent } from './pages/imprint/imprint.page';
import { LoginPageComponent } from './pages/login/login.page';
import { LogoutPageComponent } from './pages/logout/logout.page';
import { NotificationsPageComponent } from './pages/notifications/notifications.page';
import { PoliciesPageComponent } from './pages/policies/policies.page';
import { RegisterPageComponent } from './pages/register/register.page';
import { SearchPageComponent } from './pages/search/search.page';
import { BasePiece } from './pieces/base.piece';
import { DetailsPieceComponent } from './pieces/details/details.piece';
import { FollowPieceComponent } from './pieces/follow/follow.piece';
import { LikePieceComponent } from './pieces/like/like.piece';
import { SharePieceComponent } from './pieces/share/share.piece';
import { TimePieceComponent } from './pieces/time/time.piece';
import { PublicComponent } from './public.component';
import { materials } from './public.imports';
import { PublicRouter } from './public.router';

const cards: Type<BaseCard<CrudModel>>[] = [
  ActivityCardComponent,
  BlogpostCardComponent,
  InfopageCardComponent,
  OrganisationCardComponent
];

const components: Type<any>[] = [
  PublicComponent
];

const listings: Type<BaseListing<CrudModel>>[] = [
  ActivityListingComponent,
  BlogpostListingComponent,
  InfopageListingComponent,
  OrganisationListingComponent,
];

const objects: Type<BaseObject<CrudModel>>[] = [
  ActivityObjectComponent,
  BlogpostObjectComponent,
  InfopageObjectComponent,
  OrganisationObjectComponent,
];

const pages: Type<BasePage>[] = [
  HomePageComponent,
  ImprintPageComponent,
  LoginPageComponent,
  LogoutPageComponent,
  NotificationsPageComponent,
  PoliciesPageComponent,
  RegisterPageComponent,
  SearchPageComponent
];

const pieces: Type<BasePiece>[] = [
  DetailsPieceComponent,
  FollowPieceComponent,
  LikePieceComponent,
  SharePieceComponent,
  TimePieceComponent
];

@NgModule({
  declarations: [
    ...cards,
    ...components,
    ...listings,
    ...objects,
    ...pages,
    ...pieces
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
    AppCommonModule,
    PublicRouter,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class PublicModule { }
