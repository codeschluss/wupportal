import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ClientComponent } from 'src/client.component';
import { ActivityEditComponent } from 'src/crud/activity/activity.edit.component';
import { ActivityViewComponent } from 'src/crud/activity/activity.view.component';
import { OrganisationEditComponent } from 'src/crud/organisation/organisation.edit.component';
import { OrganisationViewComponent } from 'src/crud/organisation/organisation.view.component';
import { PageEditComponent } from 'src/crud/page/page.edit.component';
import { PageViewComponent } from 'src/crud/page/page.view.component';
import { UserEditComponent } from 'src/crud/user/user.edit.component';
import { UserAuthComponent } from 'src/crud/user/user.login.component';
import { UserViewComponent } from 'src/crud/user/user.view.component';
import { LayoutComponent } from 'src/layout/layout.component';
import { MappingComponent } from 'src/layout/mapping.component';
import { NavitemComponent } from 'src/layout/navitem.component';
import { NestingComponent } from 'src/layout/nesting.component';
import { UserService } from 'src/services/services';
import { I18nComponent } from 'src/utils/i18n.component';
import { LogoComponent } from 'src/utils/logo.component';
import { ClientUrlSerializer } from 'src/utils/serializer';

/*
 * Fontawesome icons
 */
fontawesome.add(fas);

/*
 * Providers
 */
const providers = [
  { provide: UserService, useClass: UserService },
  { provide: UrlSerializer, useClass: ClientUrlSerializer }
];

/*
 * Module-wide declarations
 */
const declarations = [
  ClientComponent,

  // crud
  ActivityEditComponent,
  ActivityViewComponent,
  OrganisationEditComponent,
  OrganisationViewComponent,
  PageEditComponent,
  PageViewComponent,
  UserAuthComponent,
  UserEditComponent,
  UserViewComponent,

  // layout
  LayoutComponent,
  MappingComponent,
  NavitemComponent,
  NestingComponent,

  // utils
  I18nComponent,
  LogoComponent
];

/*
 * Module-wide imports
 */
const imports = [
  ClientComponent.imports,

  // crud
  ActivityEditComponent.imports,
  ActivityViewComponent.imports,
  OrganisationEditComponent.imports,
  OrganisationViewComponent.imports,
  PageEditComponent.imports,
  PageViewComponent.imports,
  UserAuthComponent.imports,
  UserEditComponent.imports,
  UserAuthComponent.imports,

  // layout
  LayoutComponent.imports,
  MappingComponent.imports,
  NavitemComponent.imports,
  NestingComponent.imports,

  // utils
  I18nComponent.imports,
  LogoComponent.imports
];

@NgModule({
  bootstrap: [ClientComponent],
  declarations: declarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    imports,
    HttpClientModule,

    ServiceWorkerModule.register('ngsw-worker.js')
  ],
  providers: providers,
  entryComponents: [],
  exports: []
})

export class ClientModule { }
