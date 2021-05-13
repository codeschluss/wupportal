import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ClientModule } from './client.module';
import { SettingsJson } from './tools/settings';

if (SettingsJson.app.profile === 'production') {
  enableProdMode();
}

if (window === window.parent) {
  for (const src of ['cordova.js', 'zone-patch-cordova.min.js']) {
    const element = document.createElement('script');
    document.head.appendChild(Object.assign(element, { src }));
  }

  document.addEventListener('deviceready', () => {
    platformBrowserDynamic().bootstrapModule(ClientModule);
  }, false);
} else {
  window.cordova = (window.parent as Window & typeof globalThis).cordova;
  window.device = (window.parent as Window & typeof globalThis).device;

  document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(ClientModule);
  });
}
