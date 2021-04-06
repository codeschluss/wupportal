import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrudModel, LabelModule } from '../../core';
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
import { PagerComponent } from './listings/pager/pager.component';
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
import { NotificationPopupComponent } from './popups/notification/notification.popup';
import { PublicComponent } from './public.component';
import { PublicRouter } from './public.router';

const cards: Type<BaseCard<CrudModel>>[] = [
  ActivityCardComponent,
  BlogpostCardComponent,
  InfopageCardComponent,
  OrganisationCardComponent
];

const components: Type<any>[] = [
  PagerComponent,
  PublicComponent
];

const listings: Type<BaseListing<CrudModel>>[] = [
  ActivityListingComponent,
  BlogpostListingComponent,
  InfopageListingComponent,
  OrganisationListingComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  FormsModule,
  LabelModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatRippleModule,
  ReactiveFormsModule
];

const objects: Type<BaseObject<CrudModel>>[] = [
  ActivityObjectComponent,
  BlogpostObjectComponent,
  InfopageObjectComponent,
  OrganisationObjectComponent
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

const popups: Type<any>[] = [
  NotificationPopupComponent
];

@NgModule({
  declarations: [
    ...cards,
    ...components,
    ...popups,
    ...listings,
    ...objects,
    ...pages,
    ...pieces
  ],
  entryComponents: [
    ...popups,
    ...listings,
    ...objects,
    ...pages
  ],
  exports: [
    ...cards
  ],
  imports: [
    ...materials,
    CommonModule,
    PublicRouter
  ]
})

export class PublicModule { }
