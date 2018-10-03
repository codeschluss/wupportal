import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ClientComponent } from 'src/client.component';
import { LayoutComponent } from 'src/core/layout.component';
import { MappingComponent } from 'src/core/mapping.component';
import { NavitemComponent } from 'src/core/navitem.component';
import { NestingComponent } from 'src/core/nesting.component';
import { PageComponent } from 'src/core/page.component';
import { AboutPageComponent } from 'src/pages/about.page.component';
import { HomePageComponent } from 'src/pages/home.page.component';
import { LoginPageComponent } from 'src/pages/login.page.component';
import { AccountService } from 'src/services/services';
import { ActivityStepperComponent } from 'src/steppers/activity.stepper.component';
import { UserStepperComponent } from 'src/steppers/user.stepper.component';
import { BrandingComponent } from 'src/utils/branding.component';
import { I18nComponent } from 'src/utils/i18n.component';
import { ActivityViewComponent } from 'src/views/activity.view.component';
import { OrganisationViewComponent } from 'src/views/organisation.view.component';
import { ResultViewComponent } from 'src/views/result.view.component';

/*
 * Module-wide declarations
 */
const ClientDeclarations = [
  ClientComponent,

  // Navigation
  BrandingComponent,
  LayoutComponent,
  MappingComponent,
  NavitemComponent,
  NestingComponent,

  // Pages
  PageComponent,
  AboutPageComponent,
  HomePageComponent,
  LoginPageComponent,

  // Steppers
  ActivityStepperComponent,
  UserStepperComponent,

  // Views
  ActivityViewComponent,
  OrganisationViewComponent,
  ResultViewComponent,

  // Utilities
  I18nComponent
];

/*
 * Module-wide imports
 */
const ClientImports = [
  ClientComponent.imports,

  // Navigation
  BrandingComponent.imports,
  LayoutComponent.imports,
  MappingComponent.imports,
  NavitemComponent.imports,
  NestingComponent.imports,

  // Pages
  PageComponent.imports,
  AboutPageComponent.imports,
  HomePageComponent.imports,
  LoginPageComponent.imports,

  // Steppers
  ActivityStepperComponent.imports,
  UserStepperComponent.imports,

  // Views
  ActivityViewComponent.imports,
  OrganisationViewComponent.imports,
  ResultViewComponent.imports,

  // Utilities
  I18nComponent.imports
];

/*
 * Module-wide providers
 */
const ClientProviders = [
  AccountService
];

/*
 * Module-wide fontawesome icons
 */
fontawesome.add(fas);

@NgModule({
  bootstrap: [ClientComponent],
  declarations: ClientDeclarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClientImports,
    HttpClientModule,

    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: ClientProviders,
  entryComponents: [],
  exports: []
})

export class ClientModule { }
