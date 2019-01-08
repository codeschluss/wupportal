import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule, MatCardModule, MatDatepickerModule, MatExpansionModule, MatListModule, MatPaginatorModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CoreModule } from '@portal/core';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { SocialMediaComponent } from '../layout/social.media.component';
import { AboutComponent } from './about/about.component';
import { ActivityCardComponent } from './activity/activity.card.component';
import { ActivityCarouselComponent } from './activity/activity.carousel.component';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { BottomSheetScheduleComponent } from './activity/schedules.bottom.sheet.component';
import { BlogListComponent } from './blog/blog.list.component';
import { BlogListItemComponent } from './blog/blog.listitem.component';
import { BlogViewComponent } from './blog/blog.view.component';
import { BottomSheetMapComponent } from './mapping/map.bottomsheet.component';
import { MappingComponent } from './mapping/mapping.component';
import { OrganisationCardComponent } from './organisation/organisation.card.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrgaMediaDialogComponent } from './organisation/organisation.mediacontent.dialog.component';
import { OrganisationViewComponent } from './organisation/organisation.view.component';
import { PublicComponent } from './public.component';
import { PublicRouter } from './public.router';
import { SearchComponent } from './search/search.component';
import { SearchResultListComponent } from './search/searchresult.list.component';
import { PageViewComponent } from './worthKnowing/page.view.component';
import { TopicListItemComponent } from './worthKnowing/topic.listitem.component';
import { TopicsListComponent } from './worthKnowing/topics.list.component';


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
  BlogListComponent,
  BlogListItemComponent,
  BlogViewComponent,
  SearchResultListComponent,
  SearchComponent,
  SocialMediaComponent,
  TopicsListComponent,
  TopicListItemComponent,
  PageViewComponent
];

const PublicImports = [
  MatSelectModule,
  MatChipsModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatBottomSheetModule,
  MatDatepickerModule,
  ActivityViewComponent.imports,
  ActivityListComponent.imports,
  ActivityCarouselComponent.imports,
  MappingComponent.imports,
  FlexLayoutModule,
  FontAwesomeModule,
  SearchResultListComponent.imports,
  SearchComponent.imports,
  FormsModule,
  JwSocialButtonsModule,
  CoreModule,
  MatPaginatorModule,
  ReactiveFormsModule
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
    OrgaMediaDialogComponent
  ],
  exports: []
})

export class PublicModule {

 }
