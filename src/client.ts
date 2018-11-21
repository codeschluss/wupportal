import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ClientModule } from 'src/client.module';
import 'hammerjs';

enableProdMode();
fontawesome.add(fas);
platformBrowserDynamic().bootstrapModule(ClientModule);
