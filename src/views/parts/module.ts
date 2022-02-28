import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CrudModel, LabelModule } from '../../core';
import { ActivityCardComponent } from './cards/activity/activity.card';
import { BaseCard } from './cards/base.card';
import { BlogpostCardComponent } from './cards/blogpost/blogpost.card';
import { OrganisationCardComponent } from './cards/organisation/organisation.card';
import { DateFilterComponent } from './filters/date/date.filter';
import { SortFilterComponent } from './filters/sort/sort.filter';
import { JumboFrameComponent } from './frames/jumbo/jumbo.frame';
import { ListingFrameComponent } from './frames/listing/listing.frame';
import { AccountGearComponent } from './gears/account/account.gear';
import { LanguageGearComponent } from './gears/language/language.gear';
import { MenuGearComponent } from './gears/menu/menu.gear';
import { NotificationGearComponent } from './gears/notification/notification.gear';
import { SearchGearComponent } from './gears/search/search.gear';
import { SmackbarGearComponent } from './gears/smackbar/smackbar.gear';
import { SocialMediaGearComponent } from './gears/social-media/social-media.gear';
import { StaticPagesGearComponent } from './gears/static-pages/static-pages.gear';
import { StoreLinkssGearComponent } from './gears/store-links/store-links.gear';
import { BasePiece } from './pieces/base.piece';
import { DetailsPieceComponent } from './pieces/details/details.piece';
import { FollowPieceComponent } from './pieces/follow/follow.piece';
import { LikePieceComponent } from './pieces/like/like.piece';
import { SharePieceComponent } from './pieces/share/share.piece';
import { TimePieceComponent } from './pieces/time/time.piece';

const cards: Type<BaseCard<CrudModel>>[] = [
  ActivityCardComponent,
  BlogpostCardComponent,
  OrganisationCardComponent
];

const components: Type<any>[] = [
  JumboFrameComponent,
  ListingFrameComponent
];

const filters: Type<any>[] = [
  DateFilterComponent,
  SortFilterComponent
];

const gears: Type<any>[] = [
  AccountGearComponent,
  LanguageGearComponent,
  MenuGearComponent,
  NotificationGearComponent,
  SearchGearComponent,
  SmackbarGearComponent,
  SocialMediaGearComponent,
  StaticPagesGearComponent,
  StoreLinkssGearComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  LabelModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  ReactiveFormsModule
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
    ...filters,
    ...gears,
    ...pieces
  ],
  exports: [
    ...cards,
    ...components,
    ...filters,
    ...gears,
    ...pieces
  ],
  imports: [
    ...materials,
    CommonModule,
    RouterModule
  ]
})

export class PartsModule { }
