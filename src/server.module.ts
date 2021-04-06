import { NgModule } from '@angular/core';
import { ServerModule as ServerSideRenderingModule, ServerTransferStateModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';
import { ClientModule } from './client.module';
import { ServerComponent } from './server.component';

@NgModule({
  bootstrap: [
    ServerComponent
  ],
  declarations: [
    ServerComponent
  ],
  imports: [
    ClientModule,
    RouterModule,
    ServerSideRenderingModule,
    ServerTransferStateModule
  ]
})

export class ServerModule { }
