import { enableProdMode } from '@angular/core';
import { SettingsJson } from './tools/settings';

if (SettingsJson.app.profile === 'production') {
  enableProdMode();
}

export { renderModule, renderModuleFactory } from '@angular/platform-server';
export { ServerModule } from './server.module';
