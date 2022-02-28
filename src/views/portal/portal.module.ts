import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from '../../core';
import { PartsModule } from '../parts/module';
import { CommunityComponent } from './community/community.component';
import { CommunityFormComponent } from './community/community.form';
import { CommunityListingComponent } from './community/community.listing';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { EventsListingComponent } from './events/events.listing';
import { FavoritesListingComponent } from './favorites/favorites.listing';
import { IndexComponent } from './index/index.component';
import { MapComponent } from './map/map.component';
import { PlaceComponent } from './place/place.component';
import { PortalComponent } from './portal.component';
import { PortalRouter } from './portal.router';
import { SitemapComponent } from './sitemap/sitemap.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { StoryComponent } from './story/story.component';

const components: Type<any>[] = [
  CommunityComponent,
  CommunityFormComponent,
  CommunityListingComponent,
  EventComponent,
  EventsComponent,
  EventsListingComponent,
  FavoritesListingComponent,
  IndexComponent,
  MapComponent,
  PlaceComponent,
  PortalComponent,
  SitemapComponent,
  StaticPageComponent,
  StoryComponent
];

const materials: Type<any>[] = [
  CKEditorModule,
  FontAwesomeModule,
  LabelModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatMenuModule,
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
