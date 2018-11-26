import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import 'hammerjs';
import { ClientModule } from 'src/client.module';

fontawesome.add(freeicons);

enableProdMode();
platformBrowserDynamic().bootstrapModule(ClientModule);
