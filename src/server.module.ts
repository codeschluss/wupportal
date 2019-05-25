import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule as ServerSideRenderingModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ClientComponent } from './client.component';
import { ClientModule } from './client.module';
import { Loopback } from './utils/loopback';

@NgModule({
  bootstrap: [ClientComponent],
  imports: [
    ClientModule,
    ModuleMapLoaderModule,
    ServerSideRenderingModule,
    ServerTransferStateModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Loopback,
    multi: true
  }]
})

export class ServerModule { }
