import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BaseModule } from './base/base.module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ErrorModule } from './error/error.module';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [ClientComponent],
  declarations: [ClientComponent],
  imports: [
    BaseModule,
    BrowserModule.withServerTransition({ appId: 'ssr' }),
    BrowserAnimationsModule,
    ClientRouter,
    ErrorModule,
    HttpClientModule,
    TransferHttpCacheModule
  ]
})

export class ClientModule { }
