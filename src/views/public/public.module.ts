import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule, MatDatepickerModule, MatListModule, MatCardModule } from '@angular/material';

import { PublicComponent } from './public.component';
import { PublicRouter } from './public.router';

import { ActivityViewComponent } from './activity/activity.view.component';
import { ActivityCarouselComponent } from './activity/activity.carousel.component';
import { ActivityCardComponent } from './activity/activity.card.component';
import { ActivityListComponent } from './activity/activity.list.component';

import { OrganisationViewComponent } from './organisation/organisation.view.component';

import { AboutComponent } from './layout/about.component';
import { MappingComponent } from './mapping/mapping.component';

import { BottomSheetMapComponent } from './mapping/map.bottomsheet.component';
import { BottomSheetScheduleComponent } from './activity/schedules.bottom.sheet.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationCardComponent } from './organisation/organisation.card.component';
import { FormsModule } from '@angular/forms';
import { BlogListComponent } from './Blog/blog.list.component';
import { SearchResultListComponent } from './search/searchresult..list.component';

fontawesome.add(fas);

const PublicDeclarations = [
  PublicComponent,
  BottomSheetMapComponent,
  BottomSheetScheduleComponent,

  ActivityViewComponent,
  ActivityCarouselComponent,
  ActivityCardComponent,
  ActivityListComponent,
  OrganisationListComponent,
  OrganisationViewComponent,
  OrganisationCardComponent,
  AboutComponent,
  MappingComponent,
  LayoutComponent,
  BlogListComponent,
  SearchResultListComponent
];

const PublicImports = [
  PublicComponent.imports,
  MatSelectModule,
  MatChipsModule, 
  MatListModule,
  MatCardModule,
  MatBottomSheetModule,
  MatDatepickerModule,
  ActivityViewComponent.imports,
  ActivityListComponent.imports,
  ActivityCarouselComponent.imports,
  MappingComponent.imports,
  FlexLayoutModule,
  FontAwesomeModule,
  LayoutComponent.imports,
  OrganisationListComponent.imports,
  FormsModule
];

const PublicProviders = [
];

@NgModule({
  declarations: PublicDeclarations,
  imports: [
    CommonModule,
    PublicImports,
    PublicRouter
  ],
  providers: PublicProviders,
  entryComponents: [BottomSheetMapComponent, BottomSheetScheduleComponent],
  exports: []
})

export class PublicModule { }