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

import { MappingComponent } from './mapping/mapping.component';

import { BottomSheetMapComponent } from './mapping/map.bottomsheet.component';
import { BottomSheetScheduleComponent } from './activity/schedules.bottom.sheet.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationCardComponent } from './organisation/organisation.card.component';
import { FormsModule } from '@angular/forms';
import { BlogListComponent } from './blog/blog.list.component';
import { SearchResultListComponent } from './search/searchresult.list.component';
import { BlogListItemComponent } from './blog/blog.listitem.component';
import { SearchInputComponent } from './search/search.input.component';
import { BlogViewComponent } from './blog/blog.view.component';
import { NavBarComponent } from '../layout/navbar.component';
import { FooterComponent } from '../layout/footer.component';
import { ImprintDialogComponent } from '../layout/imprint.dialog.component';
import { OrgaMediaDialogComponent } from './organisation/organisation.mediacontent.dialog.component';
import { LangaugeChooserDialogComponent } from '../layout/languagecooser.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { SocialMediaComponent } from '../layout/social.media.component';
import { CoreModule } from '@portal/core';
import { AboutComponent } from './about/about.component';

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
  OrgaMediaDialogComponent,
  AboutComponent,
  MappingComponent,
  LayoutComponent,
  FooterComponent,
  NavBarComponent,
  LangaugeChooserDialogComponent,
  BlogListComponent,
  BlogListItemComponent,
  BlogViewComponent,
  SearchResultListComponent,
  SearchInputComponent,
  ImprintDialogComponent,
  SocialMediaComponent
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
  NavBarComponent.imports,
  SearchResultListComponent.imports,
  FormsModule,
  JwSocialButtonsModule,
  CoreModule
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
  entryComponents: [
    BottomSheetMapComponent,
    BottomSheetScheduleComponent,
    ImprintDialogComponent,
    OrgaMediaDialogComponent,
    LangaugeChooserDialogComponent
  ],
  exports: []
})

export class PublicModule { }
