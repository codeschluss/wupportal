import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule, MatDatepickerModule, MatListModule, MatCardModule, MatPaginatorModule } from '@angular/material';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { TopicsListComponent } from './worthKnowing/topics.list.component';
import { TopicViewComponent } from './worthKnowing/topic.view.component';
import { PageViewComponent } from './worthKnowing/page.view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { InfoBottomComponent } from './login/info.bottomsheet.component';

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
  SearchComponent,
  ImprintDialogComponent,
  SocialMediaComponent,
  TopicsListComponent,
  TopicViewComponent,
  PageViewComponent,
  LoginComponent,
  RegisterComponent,
  InfoBottomComponent
];

const PublicImports = [
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
  SearchComponent.imports,
  FormsModule,
  JwSocialButtonsModule,
  CoreModule,
  MatPaginatorModule,
  ReactiveFormsModule,
  LoginComponent.imports,
  RegisterComponent.imports
];

const PublicProviders = [
];

@NgModule({
  declarations: PublicDeclarations,
  imports: [
    CommonModule,
    PublicImports,
    PublicRouter,
  ],
  providers: PublicProviders,
  entryComponents: [
    BottomSheetMapComponent,
    BottomSheetScheduleComponent,
    ImprintDialogComponent,
    OrgaMediaDialogComponent,
    LangaugeChooserDialogComponent,
    InfoBottomComponent
  ],
  exports: []
})

export class PublicModule { }
