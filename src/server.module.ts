import { NgModule } from '@angular/core';
import { ServerModule as ServerSideRenderingModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ClientComponent } from './client.component';
import { ClientModule } from './client.module';

@NgModule({
  bootstrap: [ClientComponent],
  imports: [
    ClientModule,
    ModuleMapLoaderModule,
    ServerSideRenderingModule,
    ServerTransferStateModule
  ]
})

export class ServerModule { }
