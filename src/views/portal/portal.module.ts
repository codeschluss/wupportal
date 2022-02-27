import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from '../../core';
import { PartsModule } from '../parts/module';
import { CommunityComponent } from './community/community.component';
import { CommunityListingComponent } from './community/community.listing';
import { EventsComponent } from './events/events.component';
import { EventsListingComponent } from './events/events.listing';
import { FavoritesListingComponent } from './favorites/favorites.listing';
import { IndexComponent } from './index/index.component';
import { MapComponent } from './map/map.component';
import { PortalComponent } from './portal.component';
import { PortalRouter } from './portal.router';
import { SitemapComponent } from './sitemap/sitemap.component';
import { StaticPageComponent } from './static-page/static-page.component';

const components: Type<any>[] = [
  CommunityComponent,
  CommunityListingComponent,
  EventsComponent,
  EventsListingComponent,
  FavoritesListingComponent,
  MapComponent,
  IndexComponent,
  PortalComponent,
  SitemapComponent,
  StaticPageComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  LabelModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
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
