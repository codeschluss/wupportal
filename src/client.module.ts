import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { CoreModule, CoreSettings } from '@portal/core';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ApiConfiguration } from './api/api-configuration';
import { ApiModule } from './api/api.module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { RealmModule } from './realm/realm.module';
import { ClientPackage } from './utils/package';
import { FooterComponent } from './views/layout/footer.component';
import { ImprintDialogComponent } from './views/layout/imprint.dialog.component';
import { LangaugeChooserDialogComponent } from './views/layout/languagechooser.component';
import { LayoutComponent } from './views/layout/layout.component';
import { NavBarComponent } from './views/layout/navbar.component';
import { InfoBottomComponent } from './views/public/login/info.bottomsheet.component';
import { LoginComponent } from './views/public/login/login.component';
import { RegisterComponent } from './views/public/login/register.component';
import { SearchInputComponent } from './views/public/search/search.input.component';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [ClientComponent],
  declarations: [
    ClientComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    InfoBottomComponent,
    FooterComponent,
    NavBarComponent,
    LangaugeChooserDialogComponent,
    SearchInputComponent,
    ImprintDialogComponent,
  ],
  imports: [
    // TODO: move
    BrowserAnimationsModule,
    ApiModule,
    BrowserModule,
    ClientRouter,
    CoreModule,
    HttpClientModule,
    RealmModule,
    LoginComponent.imports,
    RegisterComponent.imports,
    NavBarComponent.imports,
    JwSocialButtonsModule,
    FontAwesomeModule,
    FormsModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    InfoBottomComponent,
    ImprintDialogComponent,
    LangaugeChooserDialogComponent,
  ]
})

export class ClientModule {

  public constructor(
    apiConfiguration: ApiConfiguration,
    coreSettings: CoreSettings
  ) {
    apiConfiguration.rootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.apiAuthUrl = ClientPackage.config.api.authUrl;
    coreSettings.apiUrl = ClientPackage.config.api.rootUrl;
    coreSettings.apiRefreshUrl = ClientPackage.config.api.refreshUrl;
    coreSettings.nominatimEndpoint = ClientPackage.config.nominatim.endpoint;
    coreSettings.nominatimParams = ClientPackage.config.nominatim.params;
  }

}
