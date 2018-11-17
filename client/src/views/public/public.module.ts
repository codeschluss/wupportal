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
import { BottomSheetScheduleComponent } from './activity/activity.bottom.sheet.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

fontawesome.add(fas);

const PublicDeclarations = [
  PublicComponent,
  BottomSheetMapComponent,
  BottomSheetScheduleComponent,

  ActivityViewComponent,
  ActivityCarouselComponent,
  ActivityCardComponent,
  ActivityListComponent,
  OrganisationViewComponent,
  AboutComponent,
  MappingComponent,
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
  entryComponents: [BottomSheetMapComponent],
  exports: []
})

export class PublicModule { }