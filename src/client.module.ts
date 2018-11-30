import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@portal/core';
import { ApiModule } from './api/api.module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ActivityProvider } from './domain/activity/activity.provider';
import { AddressProvider } from './domain/address/address.provider';
import { CategoryProvider } from './domain/category/category.provider';
import { ConfigurationProvider } from './domain/configuration/configuration.provider';
import { OrganisationProvider } from './domain/organisation/organisation.provider';
import { SuburbProvider } from './domain/suburb/suburb.provider';
import { TagProvider } from './domain/tag/tag.provider';
import { TargetGroupProvider } from './domain/target-group/target-group.provider';
import { UserProvider } from './domain/user/user.provider';
import { LayoutComponent } from './views/layout/layout.component';

const ClientProviders = [
  ActivityProvider,
  AddressProvider,
  CategoryProvider,
  ConfigurationProvider,
  OrganisationProvider,
  SuburbProvider,
  TagProvider,
  TargetGroupProvider,
  UserProvider
];

const ClientEntryComponents = [
];

const ClientDeclarations = [
  ClientComponent
];

const ClientImports = [
  LayoutComponent.imports
];

@NgModule({
  bootstrap: [ClientComponent],
  providers: ClientProviders,
  entryComponents: ClientEntryComponents,
  declarations: [
    ...ClientDeclarations,
    ...ClientEntryComponents
  ],
  imports: [
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClientImports,
    ClientRouter,
    CoreModule,
    HttpClientModule,
  ]
})

export class ClientModule { }
