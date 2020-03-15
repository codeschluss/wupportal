import { NgModule } from '@angular/core';
import { ServerModule as ServerSideRenderingModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppRouterModule } from '@wooportal/app';
import { ClientModule } from './client.module';
import { ServerComponent } from './server.component';

const platform: any[] = [
  ModuleMapLoaderModule,
  ServerSideRenderingModule,
  ServerTransferStateModule
];

@NgModule({
  bootstrap: [
    ServerComponent
  ],
  declarations: [
    ServerComponent
  ],
  imports: [
    AppRouterModule,
    ClientModule,
    ...platform
  ]
})

export class ServerModule { }
