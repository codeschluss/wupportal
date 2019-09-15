import { openUrl } from '@wooportal/core';
import { ClientPackage } from './package';

declare const android: any;
const { appUrl } = ClientPackage.config.defaults;

export function WebChromeClientFactory(): any {
  return android.webkit.WebChromeClient.extend({
    onGeolocationPermissionsShowPrompt: (url: string, callback: any) => {
      if (url.startsWith(appUrl)) {
        callback.invoke(url, true, false);
      }
    }
  });
}

export function WebViewClientFactory(onRoute?: (url: string) => void): any {
  return android.webkit.WebViewClient.extend({
    doUpdateVisitedHistory: (wv: any) => {
      const url = wv.getOriginalUrl();

      if (onRoute && url.startsWith(appUrl)) {
        onRoute(url.replace(appUrl, ''));
      }
    },
    shouldOverrideUrlLoading: (_: any, data: any) => {
      const url = typeof data === 'string' ? data : data.getUrl().toString();

      if (onRoute && url.startsWith(appUrl)) {
        onRoute(url.replace(appUrl, ''));
      } else {
        openUrl(url);
      }

      return true;
    }
  });
}
