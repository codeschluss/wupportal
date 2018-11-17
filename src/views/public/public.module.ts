import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import {ClientModule} from '../../client.module';

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
import { LayoutComponent } from './layout/layout.component';
import { NavitemComponent } from './layout/navitem.component';
import { NestingComponent } from './layout/nesting.component';
import { MappingComponent } from './mapping/mapping.component';

import { BottomSheetMapComponent } from './activity/activity.map.component';
import { BottomSheetScheduleComponent } from './activity/activity.bottom.sheet.component';

import { NgxHmCarouselModule } from 'ngx-hm-carousel';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

/*
 * Fontawesome icons
 */
fontawesome.add(fas);

const PublicDeclarations = [
  PublicComponent,
  BottomSheetMapComponent,
  BottomSheetScheduleComponent,

  // crud
  ActivityViewComponent,
  ActivityCarouselComponent,
  ActivityCardComponent,
  ActivityListComponent,
//  OrganisationEditComponent,
  OrganisationViewComponent,
//  PageEditComponent,
//  PageViewComponent,
//  UserAuthComponent,
//  UserEditComponent,
//  UserViewComponent,

  // layout
  AboutComponent,
  LayoutComponent,
  MappingComponent,
  NavitemComponent,
  NestingComponent,
];

const PublicImports = [
  // ClientModule,
  PublicComponent.imports,
  MatSelectModule,
  MatChipsModule, 
  MatListModule,
  MatCardModule,
  MatBottomSheetModule,
  MatDatepickerModule,

  // crud
  ActivityViewComponent.imports,
  ActivityListComponent.imports,
  ActivityCarouselComponent.imports,

//  OrganisationEditComponent.imports,
//  OrganisationViewComponent.imports,
//  PageEditComponent.imports,
//  PageViewComponent.imports,
//  UserAuthComponent.imports,
//  UserEditComponent.imports,
//  UserAuthComponent.imports,

  // layout
//  LayoutComponent.imports,
 MappingComponent.imports,
//  NavitemComponent.imports,
//  NestingComponent.imports,
  FlexLayoutModule,
  FontAwesomeModule,
  
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
  entryComponents: [],
  exports: []
})

export class PublicModule { }