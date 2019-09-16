import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ClientModule } from './client.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(ClientModule);
