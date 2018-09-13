import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientComponent } from 'src/client.component';
import { BrandingComponent } from 'src/layout/branding.component';
import { LayoutComponent } from 'src/layout/layout.component';
import { MappingComponent } from 'src/layout/mapping.component';
import { NavitemComponent } from 'src/layout/navitem.component';
import { NestingComponent } from 'src/layout/nesting.component';
import { AboutPageComponent } from 'src/pages/about.page.component';
import { HomePageComponent } from 'src/pages/home.page.component';
import { LoginPageComponent } from 'src/pages/login.page.component';
import { AccountService } from 'src/services/services';
import { UserStepperComponent } from 'src/steppers/user.stepper.component';
import { I18nComponent } from 'src/utils/i18n.component';
import { ActivityViewComponent } from 'src/views/activity.view.component';

/*
 * Module-wide declarations
 */
const declarations = [
  ClientComponent,

  // Navigation
  BrandingComponent,
  LayoutComponent,
  MappingComponent,
  NavitemComponent,
  NestingComponent,

  // Pages
  AboutPageComponent,
  HomePageComponent,
  LoginPageComponent,

  // Steppers
  UserStepperComponent,

  // Views
  ActivityViewComponent,

  // Utilities
  I18nComponent
];

/*
 * Module-wide providers
 */
const providers = [
  AccountService
];

@NgModule({
  bootstrap: [ClientComponent],
  declarations: declarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ...declarations.map((i) => i['imports']).filter((i) => !!i)
  ],
  providers: providers,
  entryComponents: [],
  exports: []
})

export class ClientModule { }
