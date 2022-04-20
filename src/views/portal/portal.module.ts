import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from '../../core';
import { PartsModule } from '../parts/module';
import { CommunityComponent } from './community/community.component';
import { CommunityListingComponent } from './community/community.listing';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { EventsListingComponent } from './events/events.listing';
import { FavoritesListingComponent } from './favorites/favorites.listing';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IndexComponent } from './index/index.component';
import { PlaceComponent } from './place/place.component';
import { PortalComponent } from './portal.component';
import { PortalRouter } from './portal.router';
import { RegisterPageComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { StoryComponent } from './story/story.component';

const components: Type<any>[] = [
  CommunityComponent,
  CommunityListingComponent,
  EventComponent,
  EventsComponent,
  EventsListingComponent,
  FavoritesListingComponent,
  ForgotPasswordComponent,
  IndexComponent,
  PlaceComponent,
  PortalComponent,
  RegisterPageComponent,
  SearchComponent,
  SitemapComponent,
  StaticPageComponent,
  StoryComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  FormsModule,
  LabelModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSlideToggleModule,
  PartsModule,
  ReactiveFormsModule
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
    PortalRouter
  ]
})

export class PortalModule { }
